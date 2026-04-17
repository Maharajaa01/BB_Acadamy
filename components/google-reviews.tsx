"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote, ExternalLink } from "lucide-react";
import reviewsData from "@/lib/data/reviews.json";
import { type CarouselApi } from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

export function GoogleReviews() {
  // Filter reviews with more than 3 stars
  const filteredReviews = reviewsData.filter(
    (review) => review.rating > 3
  );

  const [api, setApi] = React.useState<CarouselApi>();

  // Auto scroll plugin
  const plugin = React.useMemo(() => {
    return AutoScroll({
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    });
  }, []);

  return (
    <section className="py-14 md:py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-academy-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-9 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              4.9/5 Rating on Google
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-academy-black mb-6">
            What Our Students & Parents Say
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real feedback from our community. We pride ourselves on delivering
            excellence in education for every student.
          </p>

          <div className="w-24 h-1.5 bg-academy-orange mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Carousel */}
        <div className="relative px-2 sm:px-10">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            plugins={[plugin as any]}
            className="w-full pb-4 pt-2 cursor-grab active:cursor-grabbing"
          >
            <CarouselContent className="-ml-2 sm:-ml-4">
              {filteredReviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 sm:pl-4 basis-[84%] sm:basis-[52%] md:basis-[40%] lg:basis-[30%] select-none"
                >
                  <Card className="border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white rounded-2xl">
                    <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-auto relative">
                      {/* Quote Icon */}
                      <Quote className="absolute top-4 right-4 w-6 h-6 text-gray-100" />

                      {/* Stars */}
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? "text-yellow-500 fill-current"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-sm text-gray-600 italic leading-relaxed mb-3">
                        "{review.review_text}"
                      </p>

                      {/* User */}
                      <div className="flex items-center gap-3 pt-2 border-t border-gray-50 mt-2">
                        <Avatar className="w-10 h-10 border">
                          <AvatarImage
                            src={review.profile_image_url}
                            alt={review.author}
                          />
                          <AvatarFallback className="bg-academy-orange/10 text-academy-orange font-bold text-sm">
                            {review.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h4 className="font-semibold text-sm text-academy-black">
                            {review.author}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {review.relative_time}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows */}
            <CarouselPrevious className="hidden md:flex -left-6 bg-white border border-gray-200 hover:border-academy-orange hover:text-academy-orange" />
            <CarouselNext className="hidden md:flex -right-6 bg-white border border-gray-200 hover:border-academy-orange hover:text-academy-orange" />
          </Carousel>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://maps.app.goo.gl/Jv1JX2fdoHhFjA359"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 
            bg-white border-2 border-[#FFB902] 
            text-[#FFB902] font-bold rounded-full
            hover:bg-[#FFB902] hover:text-white
            transition-all duration-300"
          >
            <span>Read more reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
