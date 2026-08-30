"use client";

import React, { useRef } from 'react';
import { Food } from '@/types';
import { ShieldCheck, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface FoodCarouselProps {
  stateName: string;
  foods: Food[];
  onToggleFavorite?: (id: string) => void;
  favorites?: string[];
}

export const FoodCarousel: React.FC<FoodCarouselProps> = ({
  stateName,
  foods,
  onToggleFavorite,
  favorites = []
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="food" className="py-12 px-6 max-w-7xl mx-auto bg-gradient-to-b from-transparent via-[#FFF0ED]/40 to-transparent rounded-3xl my-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#FF6A4D]" />
            <span className="text-xs uppercase font-bold tracking-widest text-[#FF6A4D]">
              Verified Culinary Discoveries
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1310] mt-1">
            Taste the Region: <span className="text-[#FF6A4D] italic">{stateName} Cuisines</span>
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#FF6A4D] hover:text-white transition-colors duration-200 flex items-center justify-center border border-gray-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#FF6A4D] hover:text-white transition-colors duration-200 flex items-center justify-center border border-gray-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {foods.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-500">No traditional dishes found matching your selection.</p>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-6 pt-2 scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {foods.map((food, index) => {
            const isFav = favorites.includes(food.id);
            return (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="min-w-[280px] sm:min-w-[340px] max-w-[340px] bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex-shrink-0 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Food Image & Badge */}
                  <div className="relative h-48 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={(food as any).image_url || food.image}
                      alt={food.dish_name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        if (food.image && (e.target as HTMLImageElement).src !== food.image) {
                          (e.target as HTMLImageElement).src = food.image;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Trust Score Badge */}
                    <div className="absolute top-3 left-3 bg-[#0F5132]/90 text-white backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-lg border border-emerald-400/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span className="text-xs font-bold tracking-tight">Trust Score {food.trust_score}%</span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => onToggleFavorite?.(food.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors shadow-md ${
                        isFav ? 'bg-[#FF6A4D] text-white' : 'bg-black/30 text-white hover:bg-white hover:text-[#FF6A4D]'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                    </button>

                    {/* Price Tag Badge */}
                    <div className="absolute bottom-3 right-3 bg-[#FF6A4D] text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                      ₹{food.price_inr} INR
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D8A657]">
                      {food.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1C1310] group-hover:text-[#FF6A4D] transition-colors mt-0.5 mb-2">
                      {food.dish_name}
                    </h3>

                    {/* Review Quote box */}
                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-gray-100 mb-3">
                      <p className="text-xs text-gray-700 italic font-light leading-relaxed">
                        "{food.review_quote}"
                      </p>
                      <span className="block text-[9px] text-gray-400 mt-1 font-semibold">
                        — Sourced from {food.source}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Tags */}
                <div className="px-5 pb-5 pt-0 flex flex-wrap gap-1">
                  {food.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#FFF0ED] text-[#FF6A4D] text-[10px] font-medium px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};
