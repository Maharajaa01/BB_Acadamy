"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion } from "framer-motion";

// Complete list of YouTube Links
const youtubeLinks = [
  "https://youtu.be/1QYgntMxIEU",
  "https://youtu.be/TUxfSDnTmBU",
  "https://youtu.be/LsN2IJG25LQ",
  "https://youtu.be/1Ht0dNeTbaI",
  "https://youtu.be/OhCRSBzxqnM",
  "https://youtu.be/EC-CkrqZJyw",
  "https://youtu.be/MQqAtL2z0iA",
  "https://youtu.be/dCwo7F7XAd0",
  "https://youtu.be/sQrJ7qRLDqQ",
  "https://youtu.be/NN2CxlCYwyw",
  "https://youtu.be/hpiBEoRUEEQ",
  "https://youtube.com/shorts/CWi5koVAsyg",
  "https://youtube.com/shorts/g5c_uXnbes4",
  "https://youtube.com/shorts/f5NzQIcRz7Q",
  "https://youtu.be/q6woRK2_dIc",
  "https://youtu.be/Z8tkz22-vrQ",
  "https://youtu.be/kuov_uWyaqY",
  "https://youtu.be/Hr-VIPeDdLg",
  "https://youtu.be/CEYCYGwBKgg",
  "https://youtu.be/Sx-nGl2LLGM",
  "https://youtu.be/HS4SrPk3FZE",
  "https://youtu.be/Y02khMjYJLQ",
  "https://youtu.be/VvRKnaV9d5A",
  "https://youtu.be/1jwxa_2B7N4",
  "https://youtu.be/2G6yBCRgdtw",
  "https://youtu.be/KsiNZxyfpzA",
  "https://youtu.be/6u4firKUJCg",
  "https://youtu.be/pc525bd17jw",
  "https://youtu.be/JQfBWhsh4xk",
  "https://youtu.be/uuEqoKZFqPM",
  "https://youtube.com/shorts/94p-CDnWzVA",
];

// Helper to extract video ID from various YouTube URL formats
function getYouTubeId(url: string) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\/shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

const feedbackVideos = youtubeLinks
  .map((url) => getYouTubeId(url))
  .filter((id): id is string => Boolean(id))
  .slice(0, 12);

export function StudentsFeedback() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section
      id="students-feedback"
      className="py-10 md:py-12 relative overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-white section-shell"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-academy-orange/30 to-transparent" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-academy-orange/10 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-academy-orange/10 rounded-full blur-3xl animate-float-delayed" />

      {/* Light Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-8 md:mb-10 animate-fade-up">
        <p className="text-academy-orange font-semibold text-sm uppercase tracking-widest mb-2">
          Success Stories
        </p>
        <h2 className="text-3xl md:text-4xl font-heading text-academy-black mb-3 tracking-tight font-bold">
          3,000+ Students Trained
        </h2>
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Real student feedback from our coaching programs, showcasing
          consistent academic growth, confidence, and excellent board exam
          performance.
        </p>
        <div className="w-16 h-1 bg-academy-orange rounded-full mx-auto mt-5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {feedbackVideos.map((videoId, index) => {
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            return (
              <motion.button
                key={`${videoId}-${index}`}
                onClick={() => setActiveVideo(videoId)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 bg-gray-100 aspect-[3/4] animate-fade-up"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <Image
                  src={thumbnailUrl}
                  alt="Student feedback"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black/45 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-black/60 shadow-md border border-white/20">
                    <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                  <p className="text-[11px] md:text-xs text-white/90 font-medium">
                    Student Testimonial
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black animate-scale-in relative border border-white/10">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
