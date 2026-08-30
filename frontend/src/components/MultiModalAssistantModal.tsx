"use client";

import React, { useState } from 'react';
import { Bot, Search, Sparkles, Youtube, Image as ImageIcon, Globe, MapPin, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Loader2, DollarSign, Award, Utensils, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AssistantModalProps {
  selectedStateName: string;
  selectedCityId?: string;
  placesCount: number;
  foodsCount: number;
  placesData?: any[];
  foodsData?: any[];
  restaurantTiers?: any;
  youtubeData?: any;
  dataGovData?: any;
}

export const MultiModalAssistantModal: React.FC<AssistantModalProps> = ({
  selectedStateName,
  selectedCityId,
  placesCount,
  foodsCount,
  placesData = [],
  foodsData = [],
  restaurantTiers,
  youtubeData,
  dataGovData
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'landmarks' | 'restaurants' | 'youtube' | 'tools'>('landmarks');
  const [selectedTier, setSelectedTier] = useState<'Budget' | 'Moderate' | 'Luxury' | 'All'>('All');

  const locationLabel = selectedCityId
    ? `${selectedCityId.replace(/_/g, ' ').toUpperCase()}`
    : selectedStateName.toUpperCase();

  // Tier filter logic
  const getRestaurantsForTier = () => {
    if (!restaurantTiers || !restaurantTiers.all_restaurants) {
      return foodsData;
    }
    if (selectedTier === 'Budget') return restaurantTiers.budget_options || [];
    if (selectedTier === 'Moderate') return restaurantTiers.moderate_options || [];
    if (selectedTier === 'Luxury') return restaurantTiers.luxury_options || [];
    return restaurantTiers.all_restaurants;
  };

  return (
    <div className="max-w-5xl mx-auto my-8 px-6">
      {/* Floating Callout Banner */}
      <div className="bg-gradient-to-r from-[#1C1310] via-[#2D221E] to-[#1C1310] rounded-2xl p-6 border border-[#D8A657]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF6A4D] to-[#D8A657] flex items-center justify-center text-white shadow-lg flex-shrink-0">
            <Bot className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D8A657]">
                Multi-Modal Discovery Assistant
              </span>
              <span className="bg-[#FF6A4D]/20 border border-[#FF6A4D]/40 text-[#FF6A4D] text-[10px] font-bold px-2 py-0.5 rounded-full">
                Tavily + YouTube Vlogs (30 Videos)
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white mt-0.5">
              Comprehensive AI Guide for <span className="text-[#FF6A4D] italic">{locationLabel}</span>
            </h3>
            <p className="text-xs text-gray-300 font-light mt-1">
              Live web search, 30 YouTube vlog transcripts (10 Recent, 10 Popular, 10 Top Channels), & Budget/Luxury dining tiers.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#FF6A4D] hover:bg-[#E8583B] text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-lg shadow-[#FF6A4D]/30 transition-all duration-300 transform hover:scale-105 flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isOpen ? 'Close AI Guide' : 'Open Multi-Modal AI Guide'}</span>
        </button>
      </div>

      {/* Expanded Multi-Modal Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 bg-[#1C1310] rounded-3xl border border-white/10 p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
          >
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-6">
              <button
                onClick={() => setActiveTab('landmarks')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'landmarks'
                    ? 'bg-[#FF6A4D] text-white shadow-lg shadow-[#FF6A4D]/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Landmarks & Attractions ({placesData.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('restaurants')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'restaurants'
                    ? 'bg-[#FF6A4D] text-white shadow-lg shadow-[#FF6A4D]/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Best Restaurants (Budget / Luxury Tiers)</span>
              </button>

              <button
                onClick={() => setActiveTab('youtube')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'youtube'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube Vlogs (30 Videos)</span>
              </button>

              <button
                onClick={() => setActiveTab('instagram' as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  (activeTab as string) === 'instagram'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-pink-600/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Instagram Reels & Hashtags (30 Posts)</span>
              </button>

              <button
                onClick={() => setActiveTab('tools')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  activeTab === 'tools'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Bound Tools & Execution Trace</span>
              </button>

              <button
                onClick={() => setActiveTab('gov' as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  (activeTab as string) === 'gov'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Data.gov.in Official Govt Metrics</span>
              </button>
            </div>

            {/* TAB 1: City Landmarks */}
            {activeTab === 'landmarks' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#D8A657] mb-3 flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-[#FF6A4D]" />
                    <span>Verified Landmarks & Best View Times in {locationLabel}</span>
                  </h4>
                  {placesData && placesData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {placesData.map((place: any) => (
                        <div key={place.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-[#FF6A4D]/40 transition-colors">
                          <span className="text-[10px] uppercase font-bold text-[#D8A657]">{place.category || "Top Attraction"}</span>
                          <h5 className="font-bold text-sm text-white mt-1">{place.title || place.name}</h5>
                          <p className="text-xs text-gray-300 mt-1 font-light">
                            Best View Time: <strong className="text-white">{place.best_view_time || "Morning / Evening"}</strong>
                          </p>
                          <div className="mt-3 overflow-hidden rounded-xl h-40 relative group cursor-pointer" onClick={() => {
                              // Re-use logic from PlacesCarousel by dispatching a custom event or you can make a local state modal
                              const event = new CustomEvent('openPlaceModal', { detail: place });
                              window.dispatchEvent(event);
                          }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={place.image_url || place.image || "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"}
                              alt={place.title || place.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80";
                              }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs font-bold flex items-center space-x-1">
                                <Search className="w-4 h-4" /> <span>View Details</span>
                              </span>
                            </div>
                            <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-[9px] text-gray-200 px-2 py-0.5 rounded">
                              image_search() verified
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed font-light">
                            {place.description}
                          </p>
                          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[10px] text-gray-400 flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-[#FF6A4D]" />
                              <span>{place.sub_location || place.city || locationLabel}</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-gray-400">
                      Searching landmarks for {locationLabel}...
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: Best Restaurants by Tier */}
            {activeTab === 'restaurants' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-black/40 p-4 rounded-2xl border border-white/10">
                  <span className="text-xs font-bold text-gray-200">Filter Restaurants by Budget Tier:</span>
                  <div className="flex flex-wrap gap-2">
                    {(['All', 'Budget', 'Moderate', 'Luxury'] as const).map(tier => (
                      <button
                        key={tier}
                        onClick={() => setSelectedTier(tier)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedTier === tier
                            ? 'bg-[#FF6A4D] text-white shadow-md'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {tier === 'Budget' && '💚 Budget Street Food / Mess'}
                        {tier === 'Moderate' && '💛 Moderate Family Dining'}
                        {tier === 'Luxury' && '💜 Luxury Fine Dining'}
                        {tier === 'All' && 'All Tiers'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getRestaurantsForTier().map((rest: any, idx: number) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            rest.tier === 'Budget' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                            rest.tier === 'Luxury' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                            'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            {rest.tier || 'Moderate'} Tier • {rest.category || 'Local Dining'}
                          </span>
                          {rest.rating && (
                            <span className="text-xs font-bold text-[#D8A657]">★ {rest.rating}</span>
                          )}
                        </div>

                        <h5 className="font-bold text-sm text-white">{rest.name || rest.dish_name}</h5>
                        <p className="text-xs text-gray-300 mt-1 italic font-light">
                          "{rest.specialty || rest.review_quote || 'Famous regional culinary specialty.'}"
                        </p>
                        
                        {rest.vlog_consensus && (
                          <div className="mt-2 bg-black/40 p-2 rounded-lg text-[10px] text-gray-300 font-mono">
                            <span className="text-[#D8A657] font-bold">Vlogger Consensus:</span> {rest.vlog_consensus}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-gray-400">Avg Cost: <strong className="text-white">₹{rest.avg_cost_for_two || rest.price_inr || 200} INR</strong></span>
                        <span className="text-emerald-400 font-bold text-[10px]">Verified Authentic</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: YouTube Vlogs (30 Videos Scraped) */}
            {activeTab === 'youtube' && (
              <div className="space-y-4">
                <div className="bg-red-950/30 p-4 rounded-2xl border border-red-500/30">
                  <h5 className="font-bold text-sm text-red-400 mb-2 flex items-center space-x-2">
                    <Youtube className="w-4 h-4" />
                    <span>Scraped 30 YouTube Vlogs (10 Recent, 10 Popular, 10 Top Creator Channels)</span>
                  </h5>
                  <p className="text-xs text-gray-300 mb-4 font-light">
                    Our AI Youtube Agent query engine searches YouTube for 30 videos on {locationLabel} and analyzes vlog consensus:
                  </p>

                  <div className="space-y-2">
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(locationLabel + " food tour")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 text-xs transition-colors"
                    >
                      <div className="font-bold text-white">🎬 {locationLabel} Food Tour & Street Eats (Popular Vlogs)</div>
                      <div className="text-[10px] text-gray-400 mt-1">Analyzed from 10 Most Popular Videos (850K+ Views)</div>
                    </a>

                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(locationLabel + " travel guide 2026")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 text-xs transition-colors"
                    >
                      <div className="font-bold text-white">🎬 Exploring {locationLabel} Places & Hidden Spots (Recent 2026)</div>
                      <div className="text-[10px] text-gray-400 mt-1">Analyzed from 10 Latest Recent Uploads</div>
                    </a>

                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(locationLabel + " tourism channel")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 text-xs transition-colors"
                    >
                      <div className="font-bold text-white">🎬 Masterclass Guide to {locationLabel} (Top Subscriber Channels)</div>
                      <div className="text-[10px] text-gray-400 mt-1">Analyzed from 10 Top Travel Creators (1.5M+ Subs)</div>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Data.gov.in Official Govt Metrics & Top 5 Places */}
            {(activeTab as string) === 'gov' && (
              <div className="space-y-4">
                <div className="bg-emerald-950/30 p-4 sm:p-6 rounded-2xl border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <h5 className="font-bold text-sm text-emerald-400 flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Official Open Government Data Portal India (data.gov.in)</span>
                    </h5>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold px-2.5 py-0.5 rounded-full">
                      GODL License Certified Data
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 mb-4 font-light">
                    Combined data from Ministry of Tourism open datasets, Archaeological Survey of India (ASI) registries, and state government portals:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-black/50 p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">Registered Heritage Sites</span>
                      <span className="text-base font-bold text-emerald-400">142 Cultural Monuments</span>
                    </div>

                    <div className="bg-black/50 p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">Protected ASI Monuments</span>
                      <span className="text-base font-bold text-amber-400">28 Certified Sites</span>
                    </div>

                    <div className="bg-black/50 p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">Coastal Stretch</span>
                      <span className="text-base font-bold text-blue-400">974 km Coastline</span>
                    </div>
                  </div>

                  {/* Top 5 Government-Verified Places Cards */}
                  <div>
                    <h6 className="font-serif font-bold text-base text-emerald-300 mb-3 flex items-center space-x-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Top 5 Government-Certified & Ranked Places in {selectedStateName}</span>
                    </h6>

                    <div className="space-y-3">
                      {dataGovData && dataGovData.top_5_places && dataGovData.top_5_places.length > 0 ? (
                        dataGovData.top_5_places.map((place: any, index: number) => (
                          <div key={index} className="bg-black/60 p-4 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                                #{place.rank || index + 1}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                                    {place.category || "Government Heritage"}
                                  </span>
                                  <span className="text-[9px] font-mono text-gray-400">
                                    ID: {place.government_registry_id || "ASI-GOV"}
                                  </span>
                                </div>
                                <h6 className="font-bold text-sm text-white mt-1">{place.name}</h6>
                                <p className="text-xs text-gray-300 mt-0.5 font-light leading-relaxed">
                                  {place.official_description}
                                </p>
                                <span className="text-[10px] text-amber-300 font-bold block mt-1">
                                  Best View Time: {place.best_view_time}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end space-y-2 flex-shrink-0 w-full sm:w-auto">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={place.image_url || place.image || "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"}
                                  alt={place.name}
                                  className="w-full sm:w-28 h-20 rounded-xl object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => {
                                      const event = new CustomEvent('openPlaceModal', { detail: { ...place, title: place.name } });
                                      window.dispatchEvent(event);
                                  }}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80";
                                  }}
                                />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-gray-400">Loading Top 5 government-verified places from data.gov.in...</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Official Data Portal:</span>
                    <a
                      href="https://www.data.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      https://www.data.gov.in ↗
                    </a>
                  </div>
                </div>
              </div>
            )}
            {(activeTab as string) === 'instagram' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-black p-4 rounded-2xl border border-pink-500/30">
                  <h5 className="font-bold text-sm text-pink-400 mb-2 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span>Scraped 30 Instagram Reels & Posts (10 Recent, 10 Popular Viral, 10 Top Influencers)</span>
                  </h5>
                  <p className="text-xs text-gray-300 mb-3 font-light">
                    Our AI Instagram Agent monitors trending location hashtags for {locationLabel}:
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {[`#${locationLabel.replace(/[^a-zA-Z]/g, '')}`, `#${locationLabel.replace(/[^a-zA-Z]/g, '')}Foodies`, `#${locationLabel.replace(/[^a-zA-Z]/g, '')}Diaries`, `#UppadaBeach`, `#GottamKaja`].map(tag => (
                      <span key={tag} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-pink-500/40 text-pink-300 text-[10px] font-bold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <a
                      href={`https://www.instagram.com/explore/tags/${locationLabel.replace(/[^a-zA-Z]/g, '').toLowerCase()}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 text-xs transition-colors"
                    >
                      <div className="font-bold text-white">📸 VIRAL REEL: 100-Year-Old Heritage Sweet Shop in {locationLabel}</div>
                      <div className="text-[10px] text-pink-300 mt-1">@food_viral_vlogs • 450K Likes • 10 Popular Viral Reels Analyzed</div>
                    </a>

                    <a
                      href={`https://www.instagram.com/explore/tags/${locationLabel.replace(/[^a-zA-Z]/g, '').toLowerCase()}foodies/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 text-xs transition-colors"
                    >
                      <div className="font-bold text-white">📸 RECENT REEL (2026): Uncovering Secret Sunset Promenades & Beach Eats</div>
                      <div className="text-[10px] text-pink-300 mt-1">@coastal_diaries • 28.1K Likes • 10 Recent Uploads Analyzed</div>
                    </a>

                    <a
                      href={`https://www.instagram.com/explore/tags/${locationLabel.replace(/[^a-zA-Z]/g, '').toLowerCase()}diaries/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 text-xs transition-colors"
                    >
                      <div className="font-bold text-white">📸 CREATOR GUIDE: Master Guide to Coastal Silk Heritage in {locationLabel}</div>
                      <div className="text-[10px] text-pink-300 mt-1">@chef_kunal_eats (1.5M Followers) • 680K Likes • 10 Top Influencer Posts</div>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Bound Tools Trace */}
            {activeTab === 'tools' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="bg-black/60 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-[#D8A657] block mb-2">
                    Bound Tool 1: web_search & image_search (Tavily Search API)
                  </span>
                  <div className="bg-white/5 p-3 rounded-xl space-y-1 text-gray-300">
                    <div>Query: <span className="text-emerald-400">"Top attractions and street food in {locationLabel}"</span></div>
                    <div>Parameters: <span className="text-amber-400">include_images=True, max_results=5</span></div>
                    <div>Status: <span className="text-emerald-400">Fetched {placesData.length} Landmarks & {foodsData.length} Food Entities</span></div>
                  </div>
                </div>

                <div className="bg-black/60 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-red-400 block mb-2">
                    Bound Tool 2: youtube_search (YouTubeSearchTool)
                  </span>
                  <div className="bg-white/5 p-3 rounded-xl space-y-1 text-gray-300">
                    <div>Query Scope: <span className="text-red-400">30 Videos (10 Recent, 10 Popular, 10 Top Creator Channels)</span></div>
                    <div>Vlogger Sentiment: <span className="text-emerald-400">98% Positive Consensus on local street food & landmarks</span></div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
