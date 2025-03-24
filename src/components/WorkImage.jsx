import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const WorkImage = ({ image, alt, video, link }) => {
  const [isVideo, setIsVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  
  const handleMouseEnter = async () => {
    if (video) {
      setIsVideo(true);
      const response = await fetch(`/assets/${video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObectURL(blob);
      setVideoSrc(blobUrl);
    }
  };

  return (
    <div className="relative flex justify-center">
      <a
        className="relative"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link && (
          <div className="absolute bottom-2 right-2 bg-gray-800 w-12 h-12 flex items-center justify-center rounded-full shadow-md opacity-0 hover:opacity-100 transition-opacity">
            <MdArrowOutward className="text-white text-xl" />
          </div>
        )}
        <img src={image} alt={alt} className="max-w-full max-h-80 object-cover" />
        {isVideo && <video src={videoSrc} autoPlay muted playsInline loop className="absolute top-0 left-0 w-full h-full object-cover" />}
      </a>
    </div>
  );
};

export default WorkImage;