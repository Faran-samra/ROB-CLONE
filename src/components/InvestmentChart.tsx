import { useState, useEffect } from "react";
import AnimatingNumber from "./AnimatingNumber";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { subDays, subWeeks, subMonths, subYears, format } from "date-fns";
import { ChevronDown } from "lucide-react";

type TimeFilter = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL" | "LIVE";

const calculateValueFromPercentage = (percentage: number, total: number) => {
  const value = (percentage / 100) * total;
  return Math.abs(value);
};

function generateDummyData(timeFilter: TimeFilter) {
  const now = new Date();
  const dataPoints = 100;
  let startDate;

  switch (timeFilter) {
    case "1D":
      startDate = subDays(now, 1);
      break;
    case "1W":
      startDate = subWeeks(now, 1);
      break;
    case "1M":
      startDate = subMonths(now, 1);
      break;
    case "3M":
      startDate = subMonths(now, 3);
      break;
    case "1Y":
      startDate = subYears(now, 1);
      break;
    case "ALL":
      startDate = subYears(now, 2);
      break;
    default:
      startDate = subDays(now, 1);
  }

  const basePrice = 300000; // Base price for realistic trading
  let currentPrice = basePrice;
  const data = [];
  let trend = 1;
  let volatility = 2; // Volatility for price swings

  for (let i = 0; i < dataPoints; i++) {
    const date = new Date(
      startDate.getTime() +
        ((now.getTime() - startDate.getTime()) * i) / (dataPoints - 1)
    );

    // Randomly adjust volatility
    if (Math.random() < 0.1) {
      volatility = 0.5 + Math.random() * 0.2;
    }

    // Randomly adjust trend
    if (Math.random() < 0.05) {
      trend = Math.random() > 0.5 ? 1 : -1;
    }

    // Calculate price change
    let change = 1 + trend * (volatility * (Math.random() - 0.5));

    // Add periodic larger changes
    if (i % 10 === 0) {
      change *= 0.95 + Math.random() * 0.1;
    }

    // Add wave effect for realism
    const waveEffect = Math.sin(i / 3) * 0.02;
    change += waveEffect;

    // Update current price
    currentPrice *= change;
    currentPrice = Math.max(currentPrice, basePrice * 0.8); // Prevent price from dropping too low
    data.push({ date, price: currentPrice });
  }

  return data;
}

function InvestmentChart() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("1D");
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [baseValue, setBaseValue] = useState(300000); // Base value for profit calculation
  const [livePrice, setLivePrice] = useState(baseValue);
  const [isHovered, setIsHovered] = useState(false);

  const [graphDataCache, setGraphDataCache] = useState<
    Record<TimeFilter, Array<{ date: Date; price: number }>>
  >({
    "1D": generateDummyData("1D"),
    "1W": generateDummyData("1W"),
    "1M": generateDummyData("1M"),
    "3M": generateDummyData("3M"),
    "1Y": generateDummyData("1Y"),
    ALL: generateDummyData("ALL"),
    LIVE: generateDummyData("LIVE"),
  });

  const [graphData, setGraphData] = useState(graphDataCache[timeFilter]);

  useEffect(() => {
    setGraphData(graphDataCache[timeFilter]);
  }, [timeFilter, graphDataCache]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData((prevData) => {
        const newData = [...prevData];
        const lastPrice = newData[newData.length - 1].price;
        const randomChange = (Math.random() - 0.5) * 100; // Random price change
        const newPrice = Math.max(
          250000, // Minimum price
          Math.min(350000, lastPrice + randomChange) // Maximum price
        );
        newData.push({
          date: new Date(),
          price: newPrice,
        });
        const updatedData = newData.slice(-100);

        setGraphDataCache((prevCache) => ({
          ...prevCache,
          [timeFilter]: updatedData,
        }));

        return updatedData;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [timeFilter]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 100; // Random live price change
      setBaseValue((prev) => {
        const newValue = Math.max(
          250000, // Minimum price
          Math.min(350000, prev + randomChange) // Maximum price
        );
        if (!isHovered) setLivePrice(newValue);
        return newValue;
      });
    }, 6000); // Update every 6 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const displayValue = hoveredPrice !== null ? hoveredPrice : livePrice;

  const getTimeLabel = () => {
    switch (timeFilter) {
      case "LIVE":
        return "Past hour";
      case "1D":
        return "Today";
      case "1W":
        return "Past week";
      case "1M":
        return "Past month";
      case "3M":
        return "Past 3 months";
      case "1Y":
        return "Past year";
      case "ALL":
        return "All time";
      default:
        return "";
    }
  };

  const currentPrice = graphData[graphData.length - 1]?.price;
  const previousPrice = graphData[0]?.price;
  const priceChange = hoveredPrice
    ? hoveredPrice - previousPrice
    : currentPrice - previousPrice;
  const percentageChange = (priceChange / previousPrice) * 100;
  const isPositive = percentageChange >= 0;

  return (
    <div className="min-h-screen bg-black p-2 sm:p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="-mt-4 md:-mt-8 ml-0 md:ml-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl -mt-8 md:-mt-11 ml-2 md:ml-4 liter-regular">
            <span className="flex items-baseline w-fit">
              <span className="text-2xl sm:text-3xl md:text-4xl liter-regular">
                $
              </span>
              <AnimatingNumber value={displayValue} />
            </span>
          </h1>
          <div className="flex flex-col gap-1 mt-1 md:mt-2 ml-2 md:ml-4 text-xs sm:text-sm liter-regular">
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap liter-regular">
              <span
                className={`flex items-center parkinsans font-bold -mt-2 ${
                  isPositive ? "text-[#19cd1d]" : "text-[#ff5000]"
                }`}
              >
                <span className="text-base liter-regular font-bold">
                  {isPositive ? "▲" : "▼"}
                </span>
                $
                {calculateValueFromPercentage(
                  Math.abs(percentageChange),
                  baseValue
                ).toLocaleString()}{" "}
                (
                {Math.abs(percentageChange).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %)
              </span>
              <span className="text-gray-100 text-slate-50 whitespace-nowrap -mt-2 -ml-1">
                {getTimeLabel()}
              </span>
            </div>
          </div>
        </div>

        <div className="h-[300px] sm:h-[348px] mb-6 ml-6 mt-9">
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart
              data={graphData}
              onMouseMove={(props) => {
                if (props.activePayload) {
                  const price = props.activePayload[0].value as number;
                  setHoveredPrice(price);
                  setIsHovered(true);
                }
              }}
              onMouseLeave={() => {
                setHoveredPrice(null);
                setIsHovered(false);
              }}
            >
              <XAxis
                dataKey="date"
                tickFormatter={() => ""}
                axisLine={false}
                tickLine={false}
              />
              <YAxis domain={["auto", "auto"]} hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-2">
                        <p className="text-white">
                          {format(
                            new Date(payload[0].payload.date),
                            "MMM dd, yyyy HH:mm"
                          )}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#00c805" : "#ff5000"}
                strokeWidth={2}
                fill="none"
                activeDot={{
                  r: 5,
                  fill: isPositive ? "#00c805" : "#ff5000",
                  stroke: "black",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex -mt-24 ml-2 w-fit">
          <button
            onClick={() => setTimeFilter("LIVE")}
            className={`mx-3 py-2 font-medium text-sm font-semibold flex items-center ${
              timeFilter === "LIVE"
                ? "text-[#ff5000] border-b-2 border-[#ff5000] w-[20%]"
                : "text-white-400 hover:text-[#ff5000]"
            }`}
          >
            <span
              className={`inline-block w-[6px] h-[6px] rounded-full mr-[3px] mt-[2px] ${
                timeFilter === "LIVE"
                  ? "bg-[#ff5000] animate-blink-dot"
                  : "bg-white"
              }`}
            />
            LIVE
          </button>
          {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter as TimeFilter)}
              className={`mx-3 py-2 font-medium text-sm font-semibold ${
                timeFilter === filter
                  ? "text-[#ff5000] border-b-2 border-[#ff5000] w-[30%]"
                  : "text-white-400 hover:text-[#ff5000]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <hr className="border-gray-800 w-full ml-6" />
        <div className="flex justify-between items-center mt-4 px-4">
          <div className="flex items-center space-x-1 text-gray-400">
            <span className="font-semibold text-white ml-2">Buying power</span>
            <span className="text-sm">&#9432;</span>
          </div>
          <div className="text-normal font-medium flex">
            $11,402.74{" "}
            <ChevronDown
              className="text-xs cursor-pointer"
              style={{ scale: "0.7" }}
            />
          </div>
        </div>
        <hr className="border-gray-800 w-full ml-6 mt-4" />
      </div>
    </div>
  );
}

export default InvestmentChart;