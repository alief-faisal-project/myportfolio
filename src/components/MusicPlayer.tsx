import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const START_TIME = 60; // 1:00
const END_TIME = 180; // 3:00

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: "2PRW1Ymjnaw",
        playerVars: {
          autoplay: 0,
          controls: 0,
          start: START_TIME,
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              startEndWatcher();
            }

            if (event.data === window.YT.PlayerState.PAUSED) {
              stopEndWatcher();
            }

            if (event.data === window.YT.PlayerState.ENDED) {
              stopEndWatcher();
              setIsPlaying(false);
            }
          },
        },
      });
    };

    return () => stopEndWatcher();
  }, []);

  const startEndWatcher = () => {
    stopEndWatcher();

    intervalRef.current = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;

      const currentTime = player.getCurrentTime();
      if (currentTime >= END_TIME) {
        player.pauseVideo();
        setIsPlaying(false);
        stopEndWatcher();
      }
    }, 500);
  };

  const stopEndWatcher = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.seekTo(START_TIME, true);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center gap-4 bg-foreground text-background px-5 py-3 rounded-full">
      {/* Hidden YouTube Player */}
      <div className="hidden">
        <div id="yt-player"></div>
      </div>

      <button
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-background text-foreground"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <i
          className={`fa-solid ${isPlaying ? "fa-pause" : "fa-brands fa-google-play"} text-sm`}
        ></i>
      </button>

      <div className="flex flex-col">
        <span className="text-sm font-semibold uppercase tracking-wide">
          I Surrender (Reff)
        </span>
        <span className="text-xs text-background/70">Saybia</span>
      </div>

      {/* Sound Wave Animation */}
      <div className="flex items-end gap-[3px] h-5 ml-2">
        <span
          className={`w-1 bg-background rounded-full ${isPlaying ? "animate-wave-1" : "h-2"}`}
        ></span>
        <span
          className={`w-1 bg-background rounded-full ${isPlaying ? "animate-wave-2" : "h-3"}`}
        ></span>
        <span
          className={`w-1 bg-background rounded-full ${isPlaying ? "animate-wave-3" : "h-4"}`}
        ></span>
        <span
          className={`w-1 bg-background rounded-full ${isPlaying ? "animate-wave-4" : "h-3"}`}
        ></span>
        <span
          className={`w-1 bg-background rounded-full ${isPlaying ? "animate-wave-5" : "h-2"}`}
        ></span>
      </div>
    </div>
  );
};

export default MusicPlayer;
