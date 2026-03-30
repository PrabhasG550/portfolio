import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

type PillItem = { type: 'text'; label: string } | { type: 'icon'; src: string }

const PILLS: PillItem[] = [
  { type: 'text', label: 'UI/UX' },
  { type: 'text', label: 'design' },
  { type: 'icon', src: '/favicon.svg' },
  { type: 'icon', src: '/pills/React-icon.svg' },
  { type: 'icon', src: '/pills/Typescript_logo_2020.svg' },
  { type: 'icon', src: '/pills/Python-logo-notext.svg' },
  { type: 'icon', src: '/pills/Unofficial_JavaScript_logo_2.svg' },
  { type: 'icon', src: '/pills/java-4-logo-svgrepo-com.svg' },
  { type: 'icon', src: '/pills/Postgresql_elephant.svg' },
  { type: 'icon', src: '/pills/mongodb-svgrepo-com.svg' },
]

interface WordRainProps {
  interactive?: boolean
  floorInset?: number
}

export function WordRain({ interactive = true, floorInset = 0 }: WordRainProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pillRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const { width: W, height: H } = container.getBoundingClientRect()
    if (W === 0 || H === 0) return

    const engine = Matter.Engine.create()
    engine.gravity.y = 1.4

    const wallOpts: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      friction: 1,
      restitution: 0.05,
    }
    const floorY = H - floorInset + 25
    const floor = Matter.Bodies.rectangle(W / 2, floorY, W + 200, 50, wallOpts)
    const leftWall = Matter.Bodies.rectangle(-25, H / 2, 50, H * 2, wallOpts)
    const rightWall = Matter.Bodies.rectangle(W + 25, H / 2, 50, H * 2, wallOpts)
    Matter.Composite.add(engine.world, [floor, leftWall, rightWall])

    const pillData: { body: Matter.Body; w: number; h: number }[] = []

    pillRefs.current.forEach((el, i) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const pw = r.width
      const ph = r.height
      const x = pw / 2 + Math.random() * (W - pw)
      const y = -80 - i * 90 - Math.random() * 120

      const body = Matter.Bodies.rectangle(x, y, pw, ph, {
        chamfer: { radius: ph / 2 },
        restitution: 0.15,
        friction: 0.6,
        frictionAir: 0.01,
        density: 0.0018,
        angle: (Math.random() - 0.5) * 0.5,
      })
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04)
      pillData.push({ body, w: pw, h: ph })
    })

    Matter.Composite.add(
      engine.world,
      pillData.map((d) => d.body),
    )

    let mouseConstraint: Matter.MouseConstraint | null = null

    if (interactive) {
      const mouse = Matter.Mouse.create(container)
      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      })
      Matter.Composite.add(engine.world, mouseConstraint)

      container.removeEventListener('mousewheel', (mouse as any).mousewheel)
      container.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel)

      Matter.Events.on(mouseConstraint, 'startdrag', () => {
        container.style.cursor = 'grabbing'
      })
      Matter.Events.on(mouseConstraint, 'enddrag', () => {
        container.style.cursor = ''
      })
      Matter.Events.on(mouseConstraint, 'mousemove', () => {
        if ((mouseConstraint as any).body) {
          if (container.style.cursor !== 'grabbing') {
            container.style.cursor = 'grab'
          }
        } else if (container.style.cursor === 'grab') {
          container.style.cursor = ''
        }
      })
    }

    let ceilingAdded = false
    const addCeiling = () => {
      if (ceilingAdded) return
      const allInView = pillData.every(({ body }) => body.position.y > 0)
      if (!allInView) return
      const allSlow = pillData.every(({ body }) => {
        const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2)
        return speed < 0.5 && Math.abs(body.angularVelocity) < 0.05
      })
      if (allSlow) {
        ceilingAdded = true
        Matter.Composite.add(
          engine.world,
          Matter.Bodies.rectangle(W / 2, -25, W + 200, 50, wallOpts),
        )
      }
    }
    const ceilingCheck = setInterval(addCeiling, 500)

    const MAX_SPEED = 15
    Matter.Events.on(engine, 'beforeUpdate', () => {
      for (const { body } of pillData) {
        const vx = body.velocity.x
        const vy = body.velocity.y
        const speed = Math.sqrt(vx * vx + vy * vy)
        if (speed > MAX_SPEED) {
          const scale = MAX_SPEED / speed
          Matter.Body.setVelocity(body, { x: vx * scale, y: vy * scale })
        }
      }
    })

    const onOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0
      const beta = e.beta ?? 0
      engine.gravity.x = (gamma / 90) * 2
      engine.gravity.y = 1.4 + (beta / 90) * 1.5
    }
    window.addEventListener('deviceorientation', onOrientation)

    const runner = Matter.Runner.create()
    Matter.Runner.run(runner, engine)

    let rafId: number

    const tick = () => {
      pillData.forEach(({ body, w, h }, i) => {
        const el = pillRefs.current[i]
        if (!el) return
        const tx = body.position.x - w / 2
        const ty = body.position.y - h / 2
        el.style.transform = `translate(${tx}px, ${ty}px) rotate(${body.angle}rad)`
        el.style.opacity = '1'
      })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(ceilingCheck)
      window.removeEventListener('deviceorientation', onOrientation)
      if (mouseConstraint) {
        Matter.Events.off(mouseConstraint, 'startdrag', undefined as any)
        Matter.Events.off(mouseConstraint, 'enddrag', undefined as any)
        Matter.Events.off(mouseConstraint, 'mousemove', undefined as any)
        Matter.Composite.remove(engine.world, mouseConstraint)
      }
      Matter.Runner.stop(runner)
      Matter.Engine.clear(engine)
    }
  }, [interactive, floorInset])

  return (
    <div
      ref={containerRef}
      className={`word-rain${interactive ? '' : ' word-rain--passive'}`}
    >
      {PILLS.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            pillRefs.current[i] = el
          }}
          className={`word-rain__pill${item.type === 'icon' ? ' word-rain__pill--icon' : ''}${item.type === 'icon' && item.src.endsWith('.jpg') ? ' word-rain__pill--photo' : ''}${item.type === 'icon' && item.src.includes('React-icon') ? ' word-rain__pill--react' : ''}`}
        >
          {item.type === 'text' ? item.label : (
            <img
              src={item.src}
              alt=""
              width={item.src.endsWith('.jpg') ? 99 : item.src.includes('React-icon') ? 68 : 66}
              height={item.src.endsWith('.jpg') ? 99 : item.src.includes('React-icon') ? 60 : 66}
            />
          )}
        </div>
      ))}
    </div>
  )
}
