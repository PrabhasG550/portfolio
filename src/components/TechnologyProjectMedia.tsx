import { useState } from 'react'
import { youtubeEmbedSrc } from '../data/portfolio'

function playEmbedSrc(videoId: string) {
  const q = new URLSearchParams({ rel: '0', modestbranding: '1', autoplay: '1' })
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${q}`
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

interface DetailHeroProps {
  title: string
  artwork: string
  thumbnailSrc?: string
  youtubeVideoId?: string
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
  videoPlaying,
  onPlayVideo,
  thumbFailed,
  onThumbError,
}: DetailHeroProps) {
  const showThumb = thumbnailSrc && !thumbFailed
  const hasVideo = Boolean(youtubeVideoId)

  if (hasVideo && youtubeVideoId && videoPlaying) {
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

  if (hasVideo && youtubeVideoId && !showThumb) {
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
}

export function TechnologyCardArtwork({
  title,
  artwork,
  thumbnailSrc,
  youtubeVideoId,
}: CardArtworkProps) {
  const [thumbFailed, setThumbFailed] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)

  const showThumb = thumbnailSrc && !thumbFailed
  const hasVideo = Boolean(youtubeVideoId)

  if (hasVideo && youtubeVideoId && videoPlaying) {
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

  if (showThumb && hasVideo) {
    return (
      <div
        className="project-card__artwork project-card__artwork--video project-card__artwork--thumb"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <img
          className="project-card__thumb"
          src={thumbnailSrc}
          alt=""
          onError={() => setThumbFailed(true)}
          decoding="async"
        />
        <div className="project-card__thumb-scrim" aria-hidden="true" />
        <button
          type="button"
          className="tech-media-play-hitbox tech-media-play-hitbox--card"
          onClick={() => setVideoPlaying(true)}
          aria-label={`Play ${title} video`}
        >
          <PlayVideoOverlay />
        </button>
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

  if (hasVideo && youtubeVideoId && !showThumb) {
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

  return <div className="project-card__artwork" style={{ background: artwork }} />
}
