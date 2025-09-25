import React, { useState, useEffect } from 'react';

// Update this array to point to your images in the /public folder
const slides = [
  {
    title: "Real-time Water Quality Monitoring",
    description: "Tracking microplastic concentrations across key locations in Maharashtra.",
    // Path starts with "/" to reference the public folder
    imageUrl: "slider1.png", 
    textColor: "text-white"
  },
  {
    title: "Upload and Analyze Your Data",
    description: "Contribute to our database by uploading findings from your own research.",
    imageUrl: "slider3.jpg",
    textColor: "text-white"
  },
  {
    title: "Generate Insightful Reports",
    description: "Create detailed reports for policy-making, research, and public awareness.",
    imageUrl: "slider2.jpg",
    textColor: "text-white"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
      <div 
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="w-full h-full flex-shrink-0 relative bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
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