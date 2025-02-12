import StockChart from './StockChart';

export function CryptoList() {
  const generateRandomValues = (length: number, isNegative: boolean) => {
    const values = [];
    let value = Math.random() * 100 + 100;
    for (let i = 0; i < length; i++) {
      const change = (Math.random() - 0.5) * 20 * (isNegative ? -1 : 1);
      value += change;
      values.push(Math.max(value, 0));
    }
    return values;
  };

  const stockPrices = {
    BTC: generateRandomValues(200, true),
    ETH: generateRandomValues(200, true),
    SOL: generateRandomValues(200, false),
    DOGE: generateRandomValues(200, true),
  };

  const cryptos = [
    { symbol: 'ACRE', name: 'Ares Commercial Real Estate', price: 6.66, change: -0.75, values: generateRandomValues(50, true), shares: 4.63, assettype: "stock" },
    { symbol: 'AGNC', name: 'AGNC Investment Corp', price: 10.38, change: -2.07, values: generateRandomValues(50, true), shares: 21.36, assettype: "stock" },
    { symbol: 'ARCC', name: 'Ares Capital', price: 21.72, change: 0.32, values: generateRandomValues(50, false), shares: 6.74, assettype: "stock" },
    { symbol: 'DGRO', name: 'iShares Dividend Growth', price: 63.35, change: -0.85, values: generateRandomValues(50, true), shares: 10.17, assettype: "stock" },
    { symbol: 'DUSA', name: 'DUSA Pharmaceuticals', price: 41.79, change: -1.18, values: generateRandomValues(50, true), shares: 0.134, assettype: "stock" },
    { symbol: 'EPD', name: 'Enterprise Products Partners', price: 29.04, change: -0.48, values: generateRandomValues(50, true), shares: 21.65, assettype: "stock" },
    { symbol: 'ET', name: 'Energy Transfer', price: 16.41, change: 0.0, values: generateRandomValues(50, false), shares: 10.47, assettype: "stock" },
    { symbol: 'HDV', name: 'iShares Core High Dividend', price: 118.0, change: -1.14, values: generateRandomValues(50, true), shares: 6.95, assettype: "stock" },
    { symbol: 'ETH', name: 'Ethereum', price: 3289.30, change: 2.78, values: stockPrices.ETH, shares: 3.1, assettype: "crypto" },
    { symbol: 'SOL', name: 'Solana', price: 248.78, change: -5.37, values: stockPrices.SOL, shares: 2.41, assettype: "crypto" },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.348694, change: -2.82, values: stockPrices.DOGE, shares: 1.14, assettype: "crypto" },
    { symbol: 'ABR', name: 'Arbor Realty', price: 15.19, change: -1.37, values: generateRandomValues(50, true), shares: 1.96, assettype: "stock" },
    { symbol: 'HTGC', name: 'Hercules Capital', price: 20.21, change: 0.15, values: generateRandomValues(50, false), shares: 1.14, assettype: "stock" },
    { symbol: 'JEPI', name: 'JPMorgan Equity Premium Income', price: 59.65, change: -0.42, values: generateRandomValues(50, true), shares: 84.39, assettype: "stock" },
    { symbol: 'KO', name: 'Coca-Cola', price: 69.62, change: -1.16, values: generateRandomValues(50, true), shares: 2.9, assettype: "stock" },
  ];

  return (
    <div className="max-w-xs sticky top-1 mx-auto border border-gray-700 pb-6 px-4 z-10">
      <div className="border-b border-gray-700 pb-4 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium mt-1">Cryptocurrencies</h1>
        </div>
        <hr className="border-gray-800 w-full mt-4" />
        <div className="px-4 py-3 cursor-pointer mt-4">
          <div className="space-y-4">
            {cryptos.map((crypto) => (
              crypto.assettype === "crypto" && (
                <div key={crypto.symbol} className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-semibold text-white-700 -mt-8 -ml-2">{crypto.symbol}</span>
                    <span className="text-[10px] text-white-500 -ml-2">{crypto.shares} Shares</span>
                  </div>
                  <div className="w-20 h-6">
                    <StockChart value={crypto.values} isnegative={crypto.change < 0} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white-800 -mt-8">${crypto.price.toLocaleString()}</div>
                    <div
                      className={`text-sm ${
                        crypto.change > 0
                          ? 'text-[#7dca00]'
                          : crypto.change < 0
                          ? 'text-[#ff5000]'
                          : 'text-gray-500'
                      }`}
                    >
                      {crypto.change}%
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium mt-1">Stocks</h1>
        </div>
        <hr className="border-gray-800 w-full mt-2" />
        <div className="px-4 py-3 cursor-pointer mt-4">
          <div className="space-y-4">
            {cryptos.map((crypto) => (
              crypto.assettype === "stock" && (
                <div key={crypto.symbol} className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-semibold text-white-700 -mt-8 -ml-2">{crypto.symbol}</span>
                    <span className="text-[10px] text-white-500 -ml-2">{crypto.shares} Shares</span>
                  </div>
                  <div className="w-20 h-6">
                    <StockChart value={crypto.values} isnegative={crypto.change < 0} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white-800 -mt-8">${crypto.price.toLocaleString()}</div>
                    <div
                      className={`text-sm ${
                        crypto.change > 0
                          ? 'text-[#00c805]'
                          : crypto.change < 0
                          ? 'text-[#ff5000]'
                          : 'text-gray-500'
                      }`}
                    >
                      {crypto.change}%
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}