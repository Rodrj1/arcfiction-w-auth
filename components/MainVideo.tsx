import axios from 'axios';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

type Video = {
  id: string;
  key: string;
};

const videoOptions = {
  height: '600px',
  width: '100%',
  playerVars: {
    autoplay: 1,
    controls: 1,
    rel: 0,
    showinfo: 0,
    mute: 1,
    loop: 1,
  },
};

export default function MainVideo({ media }: { media: any }) {
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchMainVideo = async () => {
      const mainVideo: Video[] = await axios
        .get(
          `https://api.themoviedb.org/3/tv/${media}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        )
        .then((res) => res.data.results);

      setVideo(mainVideo[0]);
    };

    fetchMainVideo();
  }, []);

  if (!video) return <h1>Loading Video...</h1>;

  return (
    <div className="">
      <YouTube title="" videoId={video.key} id={video.id} opts={videoOptions} />
    </div>
  );
}
