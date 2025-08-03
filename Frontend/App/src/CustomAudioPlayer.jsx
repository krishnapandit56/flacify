import { useRef, useState, useEffect } from "react";
import { Play, Pause, Heart } from "lucide-react";

export default function CustomAudioPlayer({
  singer,
  composer,
  musicproducer,
  lyricist,
  songname,
  audiourl,
  UploadedBy,
  username,
  imageurl,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liked, setLiked] = useState(false);
  const [hasUserToggled, setHasUserToggled] = useState(false);

  async function History() {
    console.log("history called");
    fetch("https://flacify.onrender.com/api/History", {
      method: "post",
      body: JSON.stringify({ username, audiourl }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  useEffect(() => {
    History();
  }, [audiourl]);

  function toggleLike() {
    console.log("toggle");
    setLiked((prev) => !prev);
    setHasUserToggled(true);
  }

  async function checklikesong() {
    console.log("check called");
    let result = await fetch("https://flacify.onrender.com/api/CheckLiked", {
      method: "post",
      body: JSON.stringify({ username, audiourl, liked, songname, UploadedBy }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let r = await result.json();
    setLiked(r.liked);
  }

  async function likesong() {
    await fetch("https://flacify.onrender.com/api/Liked", {
      method: "post",
      body: JSON.stringify({
        username,
        audiourl,
        liked,
        songname,
        imageurl,
        UploadedBy,
        singer,
        composer,
        musicproducer,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  useEffect(() => {
    if (hasUserToggled) {
      likesong();
    }
  }, [liked]);

  // Play or pause audio
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setProgress((current / total) * 100);
  };

  // Seek audio
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = x / width;
    const newTime = percent * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  // Load audio duration
  useEffect(() => {
    const audio = audioRef.current;
    const setAudioDuration = () => setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    return () => audio.removeEventListener("loadedmetadata", setAudioDuration);
  }, []);

  // Check if song is liked
  useEffect(() => {
    if (audiourl && songname) {
      checklikesong();
    }
  }, [`${audiourl}-${songname}`]);

  // 🔧 Fix: Auto-play new song when audiourl changes
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.load();

    const playNew = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Auto-play failed:", err);
        setIsPlaying(false);
      }
    };

    playNew();
  }, [audiourl]);

  return (
    <div
      className={`w-full h-[280px] max-w-xl p-4 bg-gradient-to-t from-black to bg-blue-800 text-white shadow-lg mx-auto relative ${
        isPlaying ? "animate-pulse" : ""
      }`}
    >
      <h2 className="text-lg font-semibold mb-2 flex justify-center">
        {songname}
      </h2>

      {/* Progress bar */}
      <div
        className="w-full h-2 bg-gray-700 rounded cursor-pointer relative"
        onClick={handleSeek}
      >
        <div
          className="h-2 bg-blue-600 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <Heart
          className="h-[40px] w-[40px]"
          fill={liked ? "red" : "none"}
          role="button"
          onClick={toggleLike}
        />
        <button
          onClick={togglePlay}
          className="bg-blue-600 hover:bg-blue-200 px-4 py-2 rounded text-white relative left-[20px]"
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>

        <span className="text-sm text-gray-300">
          {Math.floor((progress / 100) * duration) || 0} /{" "}
          {Math.floor(duration) || 0}s
        </span>
      </div>

      <div className="h-[150px] w-[380px] relative left-[0px] flex items-center justify-center flex-col">
        <h2 className="text-[20px] text-white">
          <b>Uploaded By {UploadedBy}</b>
        </h2>
        <h2 className="text-[20px]">singer - {singer}</h2>
        <h2 className="text-[20px]">composer - {composer}</h2>
        <h2 className="text-[20px]">music producer - {musicproducer}</h2>
        <h2 className="text-[20px]">lyricist - {lyricist}</h2>
      </div>

      {/* Hidden audio */}
      <audio
        ref={audioRef}
        src={audiourl}
        onTimeUpdate={handleTimeUpdate}
        className="hidden"
      />
    </div>
  );
}
