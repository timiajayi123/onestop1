import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import  Autoplay  from "embla-carousel-autoplay";
const ImageSlider = () => { 

  const Images = [
        "images/Carousel2.png",
        "images/Carousel4.png",

]
  return (
    <Carousel
    
    plugins={[
    Autoplay({
      delay:3000,
    }),
  ]}
    
    >
  <CarouselContent>
{Images.map((image, index) => (
    <CarouselItem key={index} className="w-full h-[400px] md:h-[600px] ">
    <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
    </CarouselItem>
  ))}

  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
  )
}

export default ImageSlider