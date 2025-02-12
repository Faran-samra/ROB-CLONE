import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MarketNews = () => {
  const marketData = [
    { name: 'S&P 500', value: '6,101.24', change: '+0.29%' },
    { name: 'Nasdaq', value: '19,954.30', change: '-0.50%' },
    { name: 'Bitcoin', value: '$104,347.19', change: '+1.90%' }
  ];

  const NEWS_API_KEY = "c3e9fde745714ef89761bdda5cb7795b";
  const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${NEWS_API_KEY}`;

  const [newsItems, setNewsItems] = useState([]);
  const formatToDistance = (date: string) => {
    const distance = formatDistanceToNow(new Date(date), { addSuffix: false });
    return distance
      .replace('about ', '')
      .replace('less than a minute', '1m')
      .replace('minute', 'm')
      .replace('minutes', 'm')
      .replace('hour', 'h')
      .replace('hours', 'h')
      .replace('day', 'd')
      .replace('days', 'd')
      .replace('month', 'M')
      .replace('months', 'M')
      .replace('year', 'y')
      .replace('years', 'y');
  };

  useEffect(() => {
    axios.get(NEWS_API_URL)
      .then((response) => {
        setNewsItems(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  return (
    <div className="bg-black text-white mt-8 ml-10">
      <div className="flex items-center justify-between mb-6 flex-col gap-4">
        <div className="flex items-center gap-2 w-full">
          <h2 className="text-[22px] items-left font-medium">Read market news</h2>
          <span className="text-gray-500">ⓘ</span>
        </div>
        <hr className="border-gray-800 w-full" />
        <button className="bg-[#052e16] text-[#22c55e] px-4 py-1.5 rounded-full text-sm hover:bg-[#064420]">
          Show newer articles
        </button>
      </div>

      <div className="bg-[#111111] rounded mb-8">
        <div className="grid grid-cols-3 py-8 px-6">
          {marketData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="text-[15px] font-medium">{item.name}</div>
              <div className="text-[15px]">{item.value}</div>
              <div className="text-[#22c55e] text-[15px]">
                {item.change.startsWith('+') ? (
                  <span className="text-[#22c55e] flex items-center relative ml-2">
                  <span className="text-[9px] absolute top-0 -left-2 ">▲</span>
                  {item.change}
                </span>
                ) : item.change.startsWith('-') ? (
                  <span className="text-[#ef4444] flex items-center relative  ml-2">
                    <span className="text-[9px] absolute top-0 -left-2 ">▼</span>
                    {item.change}
                  </span>
                ) : (
                  item.change
                )}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {newsItems  && newsItems.map((item, index) => (

          <div key={index}>
          {
            item?.urlToImage && (
             <div className="flex gap-4 flex-col" >
              <div>
              <div key={index} className="flex items-start gap-4 group cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-1.5">
                  <div className="flex items-center gap-2">
                    {item?.source?.name === "Investor's Guild" &&
                      <span className="text-white">✎</span>
                    }
                    <span>{item?.source?.name}</span>
                  </div>
                  <span>{formatToDistance(item?.publishedAt)}</span>
  
                  {item?.ticker && (
                    <>
                      <span className="text-white">{item?.ticker}</span>
                      <span className="text-[#22c55e]">{item?.tickerChange}</span>
                    </>
                  )}
                </div>
                <h3 className="text-[15px] font-normal group-hover:text-gray-300 mb-1">{item?.title}</h3>
                {item?.description && (
                  <p className="text-[13px] text-gray-400 group-hover:text-gray-300 max-w-[700px]">{item?.description}</p>
                )}
              </div>
              <img
                src={item?.urlToImage}
                alt=""
                className="w-[140px] h-[82px] object-cover rounded"
              />
              
            </div>
              </div>
              <hr className="border-gray-800 w-full" />
             </div>
            )
          }
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default MarketNews;