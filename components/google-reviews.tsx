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
  const filteredReviews = reviewsData.filter((review) => review.rating > 3);
  const [api, setApi] = React.useState<CarouselApi>();

  // Use Embla AutoScroll plugin for continuous smooth scrolling
  const plugin = React.useMemo(() => {
    return AutoScroll({
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    });
  }, []);

  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-orange-50/50 to-white relative overflow-hidden section-shell">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-academy-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm mb-6 group transition-colors duration-300">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              4.9/5 Rating on Google
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-3">
            What Our Students & Parents Say
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto text-balance leading-relaxed">
            Real feedback from our community. We pride ourselves on delivering
            excellence in education for every student.
          </p>
          <div className="w-16 h-1 bg-academy-orange mx-auto mt-5 rounded-full"></div>
        </div>

        <div className="relative px-4 sm:px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            plugins={[plugin as any]}
            className="w-full pb-6 pt-2"
          >
            <CarouselContent className="-ml-2 sm:-ml-4">
              {filteredReviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 sm:pl-4 basis-[88%] sm:basis-[55%] md:basis-[42%] lg:basis-[31%]"
                >
                  <Card className="h-full soft-card hover:shadow-[0_12px_36px_rgb(0,0,0,0.10)] transition-all duration-500 bg-white group hover:-translate-y-1 rounded-2xl">
                    <CardContent className="p-5 sm:p-6 flex flex-col h-full relative">
                      <Quote className="absolute top-5 right-6 w-8 h-8 text-gray-100 group-hover:text-academy-orange/10 transition-colors duration-300" />

                      <div className="flex gap-1 mb-3">
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

                      <p className="text-sm text-gray-600 mb-6 italic leading-relaxed flex-grow line-clamp-6 group-hover:line-clamp-none transition-all duration-300">
                        "{review.review_text}"
                      </p>

                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                        <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                          <AvatarImage
                            src={review.profile_image_url}
                            alt={review.author}
                          />
                          <AvatarFallback className="bg-academy-orange/10 text-academy-orange font-bold text-sm">
                            {review.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h4 className="font-bold text-sm text-academy-black">
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
            <CarouselPrevious className="hidden md:flex -left-6 bg-white border-2 border-gray-100 hover:border-academy-orange hover:text-academy-orange" />
            <CarouselNext className="hidden md:flex -right-6 bg-white border-2 border-gray-100 hover:border-academy-orange hover:text-academy-orange" />
          </Carousel>
        </div>

        <div className="mt-8 md:mt-10 text-center animate-fade-up">
          <a
            href="https://maps.app.goo.gl/Jv1JX2fdoHhFjA359"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 
                bg-white text-[#FFB902] font-bold rounded-full shadow-md
                hover:bg-academy-orange hover:text-white 
                transition-all duration-300"
          >
            <span>Read more reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4 text-current" />
          </a>
        </div>
      </div>
    </section>
  );
}
