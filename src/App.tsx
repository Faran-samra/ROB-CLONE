
import { CryptoList } from './components/CryptoList';
import { DiscoverSection } from './components/DiscoverSection';
import { TopBar } from './components/TopBar';
import MarketNews from './components/MarketNews';
import DailyMovers from './components/DailyMovers';
import InvestmentChart from './components/InvestmentChart';
import { Info } from 'lucide-react';
import optionsImg from './assets/options.png';
import './assets/css/font.css'

function App() {
  return (
    <div className="min-h-screen bg-black text-white inter">
      {/* Top Banner */}
      <div className="bg-[#ccff00] text-black py-2 px-4 text-center text-sm">
        Our powerful new trading platform is here—at no extra cost.
        <a href="#" className="underline ml-1">Try Robinhood Legend</a>
      </div>

      {/* Navigation */}
      <TopBar />
      {/* Main Content */}
      <main className="w-[99vw] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-5">
          {/* Left Section */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
            <h1 className="text-[2.21rem] ml-4 sm:ml-8 md:ml-14 inter">Investing</h1>
              <button className="bg-[#ffc657] text-black px-2 py-2 rounded-full text-[11px] font-bold hover:bg-[#ffc233]">
                Earn upto 4% APY
              </button>
            </div>

            <InvestmentChart />

            <div className="bg-trasparent border border-gray-700 rounded p-2 mb-8 flex justify-between items-center -mt-16 ml-12">
              <img src={optionsImg} className='max-h-[130px] h-[130px] w-[130px] object-cover'/>
              <div>
                <p className="text-1xl mb-2 text-gray-400 ml-16"> Robinhood Legend is here</p>
                <p className="text-white-400 mb-4 ml-16 w-[90%]"> Customize your trading experience in seconds with our powerful,new trading platform.</p>
                <button className="text-orange-400 px-6 py-2 ml-10 transition-colors">
                  Unlock Legend now
                </button>
              </div>
            </div> 
            <div className='flex-1 -ml-4'>
            <button className="text-1xl font-medium mr-2 -mb-2 text-white-400 ml-16"> Cash</button>
            <button className="bg-[#ffb300] text-black px-3 py-1 rounded-full text-sm font-semibold hover:bg-[#ffc233]">
                Robinhood Gold  
              </button>
              <button className='ml-2'><Info size={16} className="text-gray-400" /></button>
              </div>
            {/* Discover Investments Section */}
            <DiscoverSection />
            <MarketNews />
            <DailyMovers />
          </div>

          {/* Right Section - Lists */}
          <div className="lg:w-[350px]">
            <CryptoList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
