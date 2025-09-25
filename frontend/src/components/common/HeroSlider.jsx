// src/components/common/HeroSlider.jsx

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: "Real-time Water Quality Monitoring",
    description: "Tracking microplastic concentrations across key locations in Maharashtra.",
    bgColor: "bg-blue-500",
    textColor: "text-white"
  },
  {
    title: "Upload and Analyze Your Data",
    description: "Contribute to our database by uploading findings from your own research.",
    bgColor: "bg-teal-500",
    textColor: "text-white"
  },
  {
    title: "Generate Insightful Reports",
    description: "Create detailed reports for policy-making, research, and public awareness.",
    bgColor: "bg-gray-700",
    textColor: "text-white"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg shadow-lg">
      {/* Slides Container */}
      <div 
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={`w-full h-full flex-shrink-0 ${slide.bgColor} ${slide.textColor} flex items-center justify-center text-center p-8`}>
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg md:text-xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;