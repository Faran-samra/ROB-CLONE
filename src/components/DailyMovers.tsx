import React from 'react';

const DailyMovers = () => {
  const stocks = [
    { name: '111, Inc', price: '$5.28', change: '+12.94%', changeType: 'positive' },
    { name: 'LexinFintech', price: '$7.61', change: '+15.05%', changeType: 'positive' },
    { name: 'Middleby', price: '$168.51', change: '+15.68%', changeType: 'positive' },
    { name: 'Super Group', price: '$7.95', change: '+16.74%', changeType: 'positive' },
    { name: 'China Resources Building', price: '$5.85', change: '-10.90%', changeType: 'negative' },
    { name: 'Shui on Land, Ltd.', price: '$3.71', change: '-17.56%', changeType: 'negative' }
  ];

  return (
    <div className="bg-black text-white mt-12 ml-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[22px] font-medium">Daily movers</h2>
        <button className="text-[#22c55e] text-[15px] hover:text-green-400">
          Show More
        </button>
      </div>
      <p className="text-[13px] text-gray-400 mb-4">Stocks making the biggest moves today.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {stocks.map((stock, index) => (
          <div 
            key={index} 
            className="bg-transparent border border-gray-800 p-4 rounded cursor-pointer hover:bg-[#191919] transition-colors"
          >
            <div className="text-[13px] text-gray-400 mb-2">{stock.name}</div>
            <div className={`text-[22px] font-medium mb-1 ${stock.changeType === 'positive' ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>{stock.price}</div>
            <div className={`text-[13px] ${
              stock.changeType === 'positive' ? 'text-[#22c55e]' : 'text-[#ef4444]'
            }`}>
              {stock.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyMovers;