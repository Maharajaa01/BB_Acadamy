"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star, Quote, ExternalLink } from "lucide-react"
import reviewsData from "@/lib/data/reviews.json"

export function GoogleReviews() {
    // Filter reviews with more than 3 stars
    const filteredReviews = reviewsData.filter((review) => review.rating > 3)

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-academy-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6 group hover:border-academy-orange transition-colors duration-300">
                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">4.9/5 Rating on Google</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-academy-black mb-6">
                        What Our Students & Parents Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
                        Real feedback from our community. We pride ourselves on delivering excellence in education for every student.
                    </p>
                    <div className="w-24 h-1.5 bg-academy-orange mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="relative px-12">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {filteredReviews.map((review, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
                                        <CardContent className="p-8 flex flex-col h-full relative">
                                            <Quote className="absolute top-6 right-8 w-10 h-10 text-gray-100 group-hover:text-academy-orange/10 transition-colors duration-300" />

                                            <div className="flex gap-1 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-200"
                                                            }`}
                                                    />
                                                ))}
                                            </div>

                                            <p className="text-gray-600 mb-8 italic leading-relaxed flex-grow line-clamp-6 group-hover:line-clamp-none transition-all duration-300">
                                                "{review.review_text}"
                                            </p>

                                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                                                <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                                                    <AvatarImage src={review.profile_image_url} alt={review.author} />
                                                    <AvatarFallback className="bg-academy-orange/10 text-academy-orange font-bold text-lg">
                                                        {review.author.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div>
                                                    <h4 className="font-bold text-academy-black">{review.author}</h4>
                                                    <p className="text-sm text-gray-400">{review.relative_time}</p>
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

                <div className="mt-16 text-center animate-fade-up">
                    <a
                        href="https://maps.app.goo.gl/Jv1JX2fdoHhFjA359"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-academy-orange text-academy-orange font-bold rounded-full hover:bg-academy-orange hover:text-white transition-all duration-300"
                    >
                        <span>Read more reviews on Google Maps</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    )
}

