"use client";

import React, { useEffect, useState } from 'react';
import { Place } from '@/types';
import { MapPin, Star, Navigation } from 'lucide-react';

interface InteractiveMapProps {
  places: Place[];
  selectedStateName: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ places, selectedStateName }) => {
  const [activePlace, setActivePlace] = useState<Place | null>(null);

  useEffect(() => {
    if (places.length > 0) {
      setActivePlace(places[0]);
    } else {
      setActivePlace(null);
    }
  }, [places]);

  const handleGetDirections = (place: Place) => {
    const destinationQuery = encodeURIComponent(`${place.title}, ${place.sub_location || selectedStateName}`);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationQuery}&destination_place_id=`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="map" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs uppercase font-bold tracking-widest text-[#0F5132]">
          Geospatial Local Explorer
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1310] mt-1">
          Interactive Map of <span className="text-[#FF6A4D] italic">{selectedStateName}</span>
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto mt-2">
          Click on any local landmark below to inspect coordinates, reviews, and nearby verified food stalls.
        </p>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 grid grid-cols-1 lg:grid-cols-3">
        {/* Left Side: Places Pin Selector List */}
        <div className="p-6 bg-[#FAF8F5] border-r border-gray-200 max-h-[500px] overflow-y-auto space-y-3">
          <h3 className="font-serif font-bold text-lg text-[#1C1310] mb-4 flex items-center space-x-2">
            <Navigation className="w-5 h-5 text-[#FF6A4D]" />
            <span>Featured Landmarks ({places.length})</span>
          </h3>

          {places.map((place) => {
            const isSelected = activePlace?.id === place.id;
            return (
              <div
                key={place.id}
                onClick={() => setActivePlace(place)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-white border-[#FF6A4D] shadow-md ring-2 ring-[#FF6A4D]/20'
                    : 'bg-white/60 border-gray-200 hover:bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#1C1310]">{place.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center space-x-1 mt-1">
                      <MapPin className="w-3 h-3 text-[#FF6A4D]" />
                      <span>{place.sub_location}</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 bg-amber-50 text-amber-700 text-xs font-bold px-2 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{place.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Visual Map Display Simulation */}
        <div className="lg:col-span-2 relative min-h-[400px] lg:min-h-[500px] bg-slate-900 flex flex-col justify-between p-6">
          {/* Simulated Satellite Map Tiles Background */}
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center filter saturate-150"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')` }}
          />

          {/* Map Controls Header */}
          <div className="relative z-10 flex items-center justify-between bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider">Live Map View - {selectedStateName}</span>
            </div>
            {activePlace && (
              <span className="text-xs text-gray-300 font-mono">
                Lat: {activePlace.latitude.toFixed(4)} | Long: {activePlace.longitude.toFixed(4)}
              </span>
            )}
          </div>

          {/* Interactive Floating Pin Overlay */}
          {activePlace && (
            <div className="relative z-10 my-auto self-center bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white max-w-md text-left transition-all duration-300 transform scale-105">
              <div className="flex items-center space-x-2 text-xs uppercase font-bold text-[#FF6A4D] mb-1">
                <MapPin className="w-4 h-4" />
                <span>Selected Destination</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1310]">{activePlace.title}</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{activePlace.description}</p>
              {(activePlace.image || activePlace.image_url) && (
                <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={activePlace.image_url || activePlace.image} 
                    alt={activePlace.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      if (activePlace.image && (e.target as HTMLImageElement).src !== activePlace.image) {
                        (e.target as HTMLImageElement).src = activePlace.image;
                      }
                    }}
                  />
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs text-gray-500 font-medium">
                  Rating: <span className="font-bold text-[#1C1310]">{activePlace.rating} / 5.0</span>
                </div>
              </div>
            </div>
          )}

          {/* Map Footer Bar */}
          <div className="relative z-10 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[11px] text-gray-300">
              Powered by Leaflet OpenStreetMap & OpenRouteService APIs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
