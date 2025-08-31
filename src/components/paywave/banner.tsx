"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const offers = [
  {
    src: "https://picsum.photos/seed/offer1/600/263",
    alt: "Exciting offer on payments",
    hint: "sale discount"
  },
  {
    src: "https://picsum.photos/seed/offer2/600/263",
    alt: "Cashback reward on shopping",
    hint: "cashback reward"
  },
  {
    src: "https://picsum.photos/seed/offer3/600/263",
    alt: "Special travel deal",
    hint: "travel deal"
  },
];

export function Banner() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  return (
    <section aria-labelledby="promo-banner-title">
      <h2 id="promo-banner-title" className="sr-only">Promotions</h2>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {offers.map((offer, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="aspect-[600/263]">
                      <Image
                          src={offer.src}
                          alt={offer.alt}
                          width={600}
                          height={263}
                          className="w-full h-full object-cover"
                          data-ai-hint={offer.hint}
                      />
                  </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}