import React, { useEffect, useState } from 'react';
import { RxDotFilled } from 'react-icons/rx'
import image1 from '../../public/assets/home/woman_run.png'
import image2 from '../../public/assets/home/wearable.png'
import image3 from '../../public/assets/home/bodybuilding.png'

export function Carousel() {
  const slides = [
    image1,
    image2,
    image3
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[1400px] h-[600px] w-full m-auto py-16 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].src})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-200'
      ></div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}