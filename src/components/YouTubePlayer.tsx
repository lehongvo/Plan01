"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

// The few parts of the YouTube IFrame API this app uses.
type YTPlayer = {
  loadVideoById(videoId: string): void;
  cueVideoById(videoId: string): void;
  setPlaybackRate(rate: number): void;
  destroy(): void;
};

type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      host?: string;
      videoId: string;
      playerVars?: Record<string, number>;
      events: {
        onReady?: (event: { target: YTPlayer }) => void;
        onStateChange?: (event: { data: number }) => void;
        onError?: (event: { data: number }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi() {
  apiPromise ??= new Promise<YTNamespace>((resolve, reject) => {
    if (window.YT?.Player) return resolve(window.YT);
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      reject(new Error("Could not load the YouTube IFrame API"));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}

/** A change of `nonce` reloads the video even when the id is unchanged. */
export type PlayRequest = { videoId: string; autoplay: boolean; nonce: number };

type Props = {
  request: PlayRequest;
  rate: number;
  onEnded: (videoId: string) => void;
};

export default function YouTubePlayer({ request, rate, onEnded }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const loadedKeyRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);
  const [apiFailed, setApiFailed] = useState(false);
  const [error, setError] = useState<{ videoId: string; code: number } | null>(null);

  const requestKey = `${request.videoId}#${request.nonce}`;

  const takeInitialRequest = useEffectEvent(() => {
    loadedKeyRef.current = requestKey;
    return request;
  });
  const handleEnded = useEffectEvent(() => onEnded(request.videoId));
  const handleError = useEffectEvent((code: number) => setError({ videoId: request.videoId, code }));
  const applyRate = useEffectEvent(() => playerRef.current?.setPlaybackRate(rate));

  // Create the player once. YouTube swaps the element it is given for an
  // iframe, so it gets a node React does not manage.
  useEffect(() => {
    const host = hostRef.current;
    let cancelled = false;
    let player: YTPlayer | null = null;

    loadYouTubeApi().then(
      (YT) => {
        if (cancelled || !host) return;
        const mount = document.createElement("div");
        host.replaceChildren(mount);
        const first = takeInitialRequest();
        player = new YT.Player(mount, {
          host: "https://www.youtube-nocookie.com",
          videoId: first.videoId,
          playerVars: { rel: 0, playsinline: 1, autoplay: first.autoplay ? 1 : 0 },
          events: {
            onReady: (event) => {
              playerRef.current = event.target;
              setReady(true);
              applyRate();
            },
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.ENDED) handleEnded();
              // YouTube resets the speed when a new video loads.
              else if (event.data === YT.PlayerState.PLAYING) applyRate();
            },
            onError: (event) => handleError(event.data),
          },
        });
      },
      () => {
        if (!cancelled) setApiFailed(true);
      },
    );

    return () => {
      cancelled = true;
      player?.destroy();
      playerRef.current = null;
      host?.replaceChildren();
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!ready || !player || loadedKeyRef.current === requestKey) return;
    loadedKeyRef.current = requestKey;
    if (request.autoplay) player.loadVideoById(request.videoId);
    else player.cueVideoById(request.videoId);
  }, [ready, requestKey, request.videoId, request.autoplay]);

  useEffect(() => {
    if (ready) playerRef.current?.setPlaybackRate(rate);
  }, [ready, rate]);

  const youtubeUrl = `https://www.youtube.com/watch?v=${request.videoId}`;
  const blocked = error?.videoId === request.videoId;

  return (
    <div className="player">
      <div ref={hostRef} className="player-frame" />
      {(apiFailed || blocked) && (
        <div className="player-fallback">
          <p>
            {apiFailed
              ? "Không tải được trình phát YouTube."
              : `Video này không phát được trong trang (mã lỗi ${error?.code}).`}
          </p>
          <a className="button button-primary" href={youtubeUrl} target="_blank" rel="noreferrer">
            Mở trên YouTube
          </a>
        </div>
      )}
    </div>
  );
}
