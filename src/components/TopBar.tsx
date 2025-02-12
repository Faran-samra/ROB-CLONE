import { Search } from "lucide-react";
import logo from "../assets/logo.png";

export function TopBar() {
  return (
    <>
      {/* Fixed Wrapper */}
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Top Banner */}
        <div className="bg-[#ccff00] text-black text-center py-2 text-xs sm:text-sm">
          Our powerful new trading platform is here—at no extra cost.
          <a href="#" className="font-bold underline">
            {" "}
            Try Robinhood Legend
          </a>
        </div>

        {/* Navigation Bar */}
        <nav className="border-b border-gray-800 bg-black">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="/" className="flex-shrink-0 ml-8 md:ml-16">
                <img src={logo} alt="Robinhood" className="h-8 sm:h-10" />
              </a>

              {/* Center Section with Search */}
              <div className="flex-1 flex justify-center mx-4 sm:mx-8 lg:mx-16">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-transparent border border-gray-800 rounded-lg py-1 sm:py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                  <a
                    href="#"
                    className="text-white hover:text-[#ff5000] text-sm"
                  >
                    Rewards
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-[#ff5000] text-sm"
                  >
                    Investing
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-[#ff5000] text-sm"
                  >
                    Crypto
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-[#ff5000] text-sm"
                  >
                    Spending
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-[#ff5000] text-sm"
                  >
                    Retirement
                  </a>
                </nav>
                <div className="flex items-center gap-4 sm:gap-6">
                  <a
                    href="#"
                    className="text-white hover:text-[#ff5000] text-sm"
                  >
                    Notifications
                  </a>
                  <a
                    href="#"
                    className="text-white hover:text-[#ff5000] text-sm"
                  >
                    Account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Prevent Overlapping */}
      <div className="mt-[90px]" />
    </>
  );
}
