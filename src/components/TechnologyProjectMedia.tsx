import { useState, type CSSProperties } from 'react'
import { youtubeEmbedSrc } from '../data/portfolio'

function playEmbedSrc(videoId: string) {
  const q = new URLSearchParams({ rel: '0', modestbranding: '1', autoplay: '1' })
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${q}`
}

/** Muted, looping preview used when a gallery card is hovered. */
function hoverEmbedSrc(videoId: string) {
  const q = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    autoplay: '1',
    mute: '1',
    controls: '0',
    loop: '1',
    playlist: videoId,
    playsinline: '1',
    disablekb: '1',
    fs: '0',
  })
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${q}`
}

function canHoverPreview() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function PlayVideoOverlay() {
  return (
    <div className="tech-media-play-layer" aria-hidden="true">
      <span className="tech-media-play-ring">
        <svg className="tech-media-play-icon" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <polygon fill="currentColor" points="8,5 8,19 19,12" />
        </svg>
      </span>
    </div>
  )
}

function NativeVideoPlayer({
  title,
  videoSrc,
  className,
  autoPlay = false,
  preview = false,
}: {
  title: string
  videoSrc: string
  className: string
  autoPlay?: boolean
  preview?: boolean
}) {
  const [previewVisible, setPreviewVisible] = useState(false)
  const previewStyle: CSSProperties | undefined = preview
    ? { opacity: previewVisible ? 1 : 0 }
    : undefined

  return (
    <video
      className={`${className} tech-media-video--no-audio`}
      title={`${title} demo video`}
      src={videoSrc}
      style={previewStyle}
      controls={!preview}
      controlsList="nodownload noplaybackrate noremoteplayback"
      disablePictureInPicture
      playsInline
      muted
      loop={preview}
      autoPlay={autoPlay || preview}
      preload={preview ? 'auto' : 'metadata'}
      onPlaying={() => {
        if (preview) setPreviewVisible(true)
      }}
      onVolumeChange={(e) => {
        const el = e.currentTarget
        if (!el.muted || el.volume > 0) {
          el.muted = true
          el.volume = 0
        }
      }}
    />
  )
}

interface DetailHeroProps {
  title: string
  artwork: string
  thumbnailSrc?: string
  youtubeVideoId?: string
  videoSrc?: string
  videoPlaying: boolean
  onPlayVideo: () => void
  thumbFailed: boolean
  onThumbError: () => void
}

export function TechnologyDetailHero({
  title,
  artwork,
  thumbnailSrc,
  youtubeVideoId,
  videoSrc,
  videoPlaying,
  onPlayVideo,
  thumbFailed,
  onThumbError,
}: DetailHeroProps) {
  const showThumb = thumbnailSrc && !thumbFailed
  const hasVideo = Boolean(youtubeVideoId || videoSrc)

  if (hasVideo && videoPlaying) {
    if (videoSrc) {
      return (
        <div className="project-detail__hero project-detail__hero--video">
          <NativeVideoPlayer
            title={title}
            videoSrc={videoSrc}
            className="project-detail__hero-video"
            autoPlay
          />
        </div>
      )
    }

    if (youtubeVideoId) {
      return (
        <div className="project-detail__hero project-detail__hero--video">
          <iframe
            className="project-detail__hero-iframe"
            title={`${title} demo video`}
            src={playEmbedSrc(youtubeVideoId)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )
    }
  }

  if (showThumb && hasVideo) {
    return (
      <div className="project-detail__hero project-detail__hero--thumb">
        <img
          className="project-detail__hero-thumb"
          src={thumbnailSrc}
          alt=""
          onError={onThumbError}
          decoding="async"
        />
        <div className="project-detail__hero-thumb-scrim" aria-hidden="true" />
        <button type="button" className="tech-media-play-hitbox" onClick={onPlayVideo} aria-label={`Play ${title} video`}>
          <PlayVideoOverlay />
        </button>
      </div>
    )
  }

  if (showThumb && !hasVideo) {
    return (
      <div className="project-detail__hero project-detail__hero--thumb project-detail__hero--photo-thumb">
        <img
          className="project-detail__hero-thumb"
          src={thumbnailSrc}
          alt=""
          onError={onThumbError}
          decoding="async"
        />
      </div>
    )
  }

  if (hasVideo && !showThumb) {
    if (videoSrc) {
      return (
        <div className="project-detail__hero project-detail__hero--video">
          <NativeVideoPlayer title={title} videoSrc={videoSrc} className="project-detail__hero-video" />
        </div>
      )
    }

    if (youtubeVideoId) {
      return (
        <div className="project-detail__hero project-detail__hero--video">
          <iframe
            className="project-detail__hero-iframe"
            title={`${title} demo video`}
            src={youtubeEmbedSrc(youtubeVideoId)}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )
    }
  }

  return (
    <div className="project-detail__hero" style={{ background: artwork }}>
      <div className="project-detail__hero-veil" />
    </div>
  )
}

interface CardArtworkProps {
  title: string
  artwork: string
  thumbnailSrc?: string
  youtubeVideoId?: string
  videoSrc?: string
}

export function TechnologyCardArtwork({
  title,
  artwork,
  thumbnailSrc,
  youtubeVideoId,
  videoSrc,
}: CardArtworkProps) {
  const [thumbFailed, setThumbFailed] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [hoverPreview, setHoverPreview] = useState(false)

  const showThumb = thumbnailSrc && !thumbFailed
  const hasVideo = Boolean(youtubeVideoId || videoSrc)

  const startHoverPreview = () => {
    if (canHoverPreview()) setHoverPreview(true)
  }
  const stopHoverPreview = () => setHoverPreview(false)

  if (hasVideo && videoPlaying) {
    if (videoSrc) {
      return (
        <div
          className="project-card__artwork project-card__artwork--video"
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <NativeVideoPlayer title={title} videoSrc={videoSrc} className="project-card__video" autoPlay />
        </div>
      )
    }

    if (youtubeVideoId) {
      return (
        <div
          className="project-card__artwork project-card__artwork--video"
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <iframe
            className="project-card__iframe"
            title={`${title} demo video`}
            src={playEmbedSrc(youtubeVideoId)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )
    }
  }

  if (showThumb && hasVideo) {
    return (
      <div
        className="project-card__artwork project-card__artwork--video project-card__artwork--thumb"
        onMouseEnter={startHoverPreview}
        onMouseLeave={stopHoverPreview}
        role="presentation"
      >
        <img
          className="project-card__thumb"
          src={thumbnailSrc}
          alt=""
          onError={() => setThumbFailed(true)}
          decoding="async"
        />
        {hoverPreview && videoSrc ? (
          <NativeVideoPlayer
            title={title}
            videoSrc={videoSrc}
            className="project-card__video project-card__video--preview"
            preview
          />
        ) : null}
        {hoverPreview && !videoSrc && youtubeVideoId ? (
          <iframe
            className="project-card__iframe project-card__iframe--preview"
            title={`${title} demo video`}
            src={hoverEmbedSrc(youtubeVideoId)}
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        ) : null}
        {hoverPreview ? null : (
          <>
            <div className="project-card__thumb-scrim" aria-hidden="true" />
            <button
              type="button"
              className="tech-media-play-hitbox tech-media-play-hitbox--card"
              onClick={(e) => {
                e.stopPropagation()
                setVideoPlaying(true)
              }}
              aria-label={`Play ${title} video`}
            >
              <PlayVideoOverlay />
            </button>
          </>
        )}
      </div>
    )
  }

  if (showThumb && !hasVideo) {
    return (
      <div className="project-card__artwork project-card__artwork--photo">
        <img
          className="project-card__thumb"
          src={thumbnailSrc}
          alt=""
          onError={() => setThumbFailed(true)}
          decoding="async"
        />
      </div>
    )
  }

  if (hasVideo && !showThumb) {
    if (videoSrc) {
      return (
        <div
          className="project-card__artwork project-card__artwork--video"
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <NativeVideoPlayer title={title} videoSrc={videoSrc} className="project-card__video" />
        </div>
      )
    }

    if (youtubeVideoId) {
      return (
        <div
          className="project-card__artwork project-card__artwork--video"
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <iframe
            className="project-card__iframe"
            title={`${title} demo video`}
            src={youtubeEmbedSrc(youtubeVideoId)}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )
    }
  }

  return <div className="project-card__artwork" style={{ background: artwork }} />
}
