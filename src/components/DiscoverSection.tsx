import React from 'react';
import { Info } from 'lucide-react';

export function DiscoverSection() {
  const categories = [
    { icon: '🆕', name: 'Newly Listed Crypto' },
    { icon: '📊', name: 'Tradable Crypto' },
    { icon: '🚀', name: 'IPO Access' },
    { icon: '💰', name: 'Altcoins' },
    { icon: '📈', name: '100 Most Popular' },
    { icon: '📊', name: 'Daily Movers' },
    { icon: '🌿', name: 'Cannabis' },
    { icon: '📅', name: 'Upcoming Earnings' },
    { icon: '⏰', name: '24 Hour Market' },
    { icon: '💻', name: 'Tech, Media, & Telecom' },
    { icon: '🔧', name: 'Technology' },
    { icon: '📈', name: 'ETFs' },
    { icon: '🔥', name: 'Energy' },
    { icon: '🏥', name: 'Pharma' },
    { icon: '🪴', name: 'Growth & Value ETFs' },
    { icon: '💧', name: 'Energy & Water' },
    { icon: '💧', name: 'Health Care' },
    { icon: '🛍️', name: 'Consumer Goods' },

  ];

  return (
    <section>
      <div className="flex items-center justify-between mt-16 ml-10">
        <div className="flex items-center gap-2 mt-4">
          <h2 className="text-xl">Discover investments</h2>
          <Info size={16} className="text-gray-400" />
        </div>
        <button className="text-sm text-white/90 hover:text-white/50 underline font-medium">Show More</button>
      </div>

      <div className="flex flex-wrap gap-4 mt-4 ml-8">
        {categories.map((category) => (
          <button
        key={category.name}
        className="flex items-center gap-2 bg-transparent border border-gray-800 rounded-full px-2 py-1 hover:bg-gray-800 transition-colors"
          >
        <span >{category.icon}</span>
        <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}