"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── Inline SVG Icons (no extra deps) ─────────────────────────────────────────
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);
const VolumeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);
const MuteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);
const FullscreenIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);
const ReplayIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
  </svg>
);

// ─── Time formatter ────────────────────────────────────────────────────────────
const fmt = (s) => {
  if (!isFinite(s) || s < 0) return '00:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

// ─── Custom Controls (MP4 only) ────────────────────────────────────────────────
const VideoControls = ({ videoRef, containerRef }) => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ended, setEnded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef(null);
  const hideTimer = useRef(null);

  // ── Auto-hide logic ──────────────────────────────────────────────────────────
  const resetHideTimer = useCallback(() => {
    setVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!paused) setVisible(false);
    }, 2500);
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('mousemove', resetHideTimer);
    container.addEventListener('mouseleave', () => {
      if (!paused) setVisible(false);
    });
    return () => {
      container.removeEventListener('mousemove', resetHideTimer);
      clearTimeout(hideTimer.current);
    };
  }, [containerRef, resetHideTimer]);

  // ── Video event listeners ────────────────────────────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onMeta = () => setDuration(v.duration);
    const onTime = () => { if (!dragging) setCurrent(v.currentTime); };
    const onPlay = () => { setPaused(false); setEnded(false); };
    const onPause = () => setPaused(true);
    const onEnd = () => { setEnded(true); setPaused(true); };

    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnd);
    return () => {
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnd);
    };
  }, [videoRef, dragging]);

  // ── Seek helpers ─────────────────────────────────────────────────────────────
  const seekFromEvent = useCallback((e) => {
    const track = trackRef.current;
    const v = videoRef.current;
    if (!track || !v || !duration) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const time = ratio * duration;
    v.currentTime = time;
    setCurrent(time);
  }, [videoRef, duration]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => seekFromEvent(e);
    const onUp = (e) => { seekFromEvent(e); setDragging(false); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging, seekFromEvent]);

  // ── Control actions ──────────────────────────────────────────────────────────
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (ended) { v.currentTime = 0; v.play(); return; }
    paused ? v.play() : v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const c = containerRef.current;
    if (!c) return;
    if (!document.fullscreenElement) c.requestFullscreen();
    else document.exitFullscreen();
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-10"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* ── Progress bar ── */}
      <div
        ref={trackRef}
        className="relative w-full h-5 flex items-center cursor-pointer group/track mb-2"
        onMouseDown={(e) => { setDragging(true); seekFromEvent(e); }}
        onClick={seekFromEvent}
      >
        {/* Track */}
        <div className="absolute inset-y-0 my-auto w-full h-[2px] group-hover/track:h-[3px] bg-white/10 rounded-full transition-all duration-150" />
        {/* Fill */}
        <div
          className="absolute left-0 inset-y-0 my-auto h-[2px] group-hover/track:h-[3px] rounded-full transition-all duration-150"
          style={{ width: `${progress}%`, background: '#00FF41', boxShadow: '0 0 6px rgba(0,255,65,0.6)' }}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover/track:opacity-100 transition-opacity duration-150"
          style={{ left: `calc(${progress}% - 6px)`, background: '#00FF41', boxShadow: '0 0 8px rgba(0,255,65,0.8)' }}
        />
      </div>

      {/* ── Button row ── */}
      <div className="flex items-center gap-3">
        {/* Play / Pause / Replay */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-[#00FF41] transition-colors duration-200"
          aria-label={ended ? 'Replay' : paused ? 'Play' : 'Pause'}
        >
          {ended ? <ReplayIcon /> : paused ? <PlayIcon /> : <PauseIcon />}
        </button>

        {/* Mute */}
        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-[#00FF41] transition-colors duration-200"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <MuteIcon /> : <VolumeIcon />}
        </button>

        {/* Timestamp */}
        <span
          className="font-mono text-[11px] tracking-widest text-white/40 select-none"
          style={{ fontFamily: "'Geist Mono', 'JetBrains Mono', monospace" }}
        >
          {fmt(current)}<span className="text-white/20 mx-1">/</span>{fmt(duration)}
        </span>

        {/* Spacer */}
        <div className="flex-1" />

        {/* SYS.ACTIVE badge */}
        <div className="hidden md:flex items-center gap-2 mr-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41]/80 animate-pulse" style={{ boxShadow: '0 0 6px rgba(0,255,65,0.8)' }} />
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/30">SYS.ACTIVE</span>
        </div>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-[#00FF41] transition-colors duration-200"
          aria-label="Fullscreen"
        >
          <FullscreenIcon />
        </button>
      </div>
    </div>
  );
};

// ─── Main DemoVideo Component ──────────────────────────────────────────────────
const DemoVideo = ({ videoUrl }) => {
  const [isActive, setIsActive] = useState(false); // controlled by IntersectionObserver
  const [ytSrc, setYtSrc] = useState('');      // YouTube: swap autoplay on trigger
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const isYouTube = (url) => url && (url.includes('youtube.com') || url.includes('youtu.be'));

  const buildYouTubeUrl = (url, autoplay) => {
    if (!url) return '';
    let videoId = '';
    try {
      if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
      else if (url.includes('youtube.com/watch')) videoId = new URL(url).searchParams.get('v');
      else if (url.includes('youtube.com/embed/')) videoId = url.split('youtube.com/embed/')[1].split('?')[0];
    } catch (e) { console.error('Invalid YouTube URL'); }
    const ap = autoplay ? 1 : 0;
    return `https://www.youtube.com/embed/${videoId}?autoplay=${ap}&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&modestbranding=1`;
  };

  // ── Set initial YouTube src for pre-loading on mount ────────────────────────
  useEffect(() => {
    if (isYouTube(videoUrl)) {
      setYtSrc(buildYouTubeUrl(videoUrl, false)); // autoplay=0 — preloads page/connection
    }
  }, [videoUrl]);

  // ── IntersectionObserver — play on scroll ────────────────────────────────────
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
          if (isYouTube(videoUrl)) {
            // Swap src to autoplay=1 — video data already partially fetched
            setYtSrc(buildYouTubeUrl(videoUrl, true));
          } else {
            // MP4 was preloaded via preload="auto"; just call play()
            videoRef.current?.play().catch(() => { });
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [videoUrl]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full sm:pt-16 sm:pb-8 md:pt-24 md:pb-20 px-6 lg:px-12 flex justify-center items-center z-10"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-matrix/5 blur-[120px] rounded-full pointer-events-none" />

      <div
        ref={containerRef}
        className="relative w-full max-w-5xl rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-black aspect-video border border-white/5 hover:border-matrix/20 hover:shadow-[0_0_4rem_rgba(0,255,65,0.06)] shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        {/* ── Standby overlay — fades out when active ── */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-[#030303] transition-opacity duration-700"
          style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? 'none' : 'auto' }}
        >
          <div className="flex flex-col items-center gap-4 text-white/10 font-mono text-[11px] tracking-[0.3em]">
            <div className="w-32 h-[1px] bg-white/5" />
            <span>STANDBY</span>
          </div>
        </div>

        {/* ── YouTube iframe — pre-loaded on mount, autoplay swapped on scroll ── */}
        {isYouTube(videoUrl) && ytSrc && (
          <iframe
            src={ytSrc}
            className="absolute inset-0 w-full h-full border-0 bg-black"
            allow="autoplay; encrypted-media; picture-in-picture"
            title="Demo Video"
            allowFullScreen
          />
        )}

        {/* ── MP4 video — preloaded silently on mount, played on scroll ── */}
        {!isYouTube(videoUrl) && videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            preload="auto"
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover bg-black outline-none"
          />
        )}

        {/* ── Custom controls — MP4 only ── */}
        {isActive && !isYouTube(videoUrl) && (
          <VideoControls videoRef={videoRef} containerRef={containerRef} />
        )}
      </div>
    </section>
  );
};

export default DemoVideo;
