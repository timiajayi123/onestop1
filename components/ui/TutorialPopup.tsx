"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpLeft } from "lucide-react";

type Props = {
  onClose: () => void;
};

type Slide = {
  type: "image" | "video";
  src: string;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    type: "image",
    src: "/tutorial/page1.png",
    title: "Welcome to OneStop Shop",
    subtitle: "Get started with a short walkthrough of how to use the site.",
  },
  {
    type: "video",
    src: "/tutorial/vid1.mp4",
    title: "Shopping for a Shoe?",
    subtitle: "Click 'Shop Now' to find variants of that Shoe.",
  },
  {
    type: "video",
    src: "/tutorial/vid2.mp4",
    title: "Variants of this type of Product",
    subtitle: "Now you can add to cart as you wish",
  },

   {
    type: "video",
    src: "/tutorial/vid3.mp4",
    title: "Add to Cart",
    subtitle: "As you add to cart you should get a notification",
  },
];

const TutorialPopup = ({ onClose }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showHelperArrow, setShowHelperArrow] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setShowHelperArrow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    slides.forEach((slide, index) => {
      if (slide.type === "video" && videoRefs.current[index]) {
        if (index === currentSlide) {
          videoRefs.current[index]?.play();
        } else {
          videoRefs.current[index]?.pause();
          videoRefs.current[index].currentTime = 0;
        }
      }
    });
  }, [currentSlide]);

  const handleClose = () => {
    localStorage.setItem("hasSeenTutorial", "true");
    onClose();
  };

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const current = slides[currentSlide];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative flex items-center justify-center w-full max-w-2xl px-8">
          {/* Left Arrow */}
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -left-24 top-1/2 -translate-y-1/2 bg-white/90 text-black p-2 rounded-full shadow-md z-[1000]"
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Tutorial Box */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              duration: 0.6,
            }}
            className="relative w-full bg-white rounded-3xl shadow-xl p-6 md:p-8 text-center"
          >
            {/* Dynamic title and subtitle */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {current.title}
            </h2>
            <p className="text-gray-600 mb-4">{current.subtitle}</p>

            {/* Slide Content */}
            <div className="relative w-full h-[320px] rounded-xl overflow-hidden mb-6 bg-black">
              {slides.map((slide, index) =>
                slide.type === "image" ? (
                  currentSlide === index && (
                    <img
                      key={slide.src}
                      src={slide.src}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  )
                ) : (
                  <video
                    key={slide.src}
ref={(el) => {
  videoRefs.current[index] = el;
}}

                    src={slide.src}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )
              )}
            </div>

            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -bottom-28 left-1/2 -translate-x-1/2 bg-black text-white p-2 rounded-full shadow-md z-[1000]"
            >
              <X size={20} />
            </motion.button>
          </motion.div>

          {/* Right Arrow */}
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -right-24 top-1/2 -translate-y-1/2 bg-white/90 text-black p-2 rounded-full shadow-md z-[1000]"
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Helper Arrow */}
          {showHelperArrow && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-10 left-6 z-[1001]"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              >
                <ArrowUpLeft
                  size={36}
                  className="text-white drop-shadow-xl rotate-180"
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TutorialPopup;
