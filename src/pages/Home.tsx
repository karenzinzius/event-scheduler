import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import hero2 from "../assets/hero2.jpeg";
import hero3 from "../assets/hero3.jpeg";
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpeg";
import image4 from "../assets/image4.jpeg";

const heroImages = [hero, hero2, hero3, image1, image2, image3, image4];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  // Slideshow rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Hero Background Slideshow */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${heroImages[currentImage]})`,
        }}
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-32 px-4">
        <h1 className="text-white text-5xl font-bold drop-shadow-lg mb-6">
          Welcome to EventHub
        </h1>
        <p className="text-white/90 text-lg mb-8">
          Discover exciting events around you
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <Link
            to="/events"
            className="px-6 py-3 bg-gray-400 text-black font-semibold rounded-xl shadow-lg hover:bg-gray-200 transition"
          >
            Events
          </Link>

          <Link
            to="/signin"
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-200 hover:text-black transition"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-400 hover:text-black transition"
          >
            Sign Up
          </Link>
        </div>

        <div className="mb-12">
          <Link
            to="/create-event"
            className="px-6 py-3 bg-black text-white border border-black-300 text-black font-semibold rounded-xl shadow hover:bg-gray-400 hover:text-black transition"
          >
            Create Event
          </Link>
        </div>
      </div>
    </div>
  );
}
