import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const AnimatedPrice = ({ value, isHovered }: { value: number; isHovered: boolean }) => {
  const prevValue = usePrevious(value);
  const formattedValue = value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const currentDigits = formattedValue.split("");
  const prevDigits = (prevValue?.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) || "").split("");

  return (
    <div className="amount text-2xl sm:text-3xl md:text-4xl liter-regular">
      {currentDigits.map((char, index) => {
        if (isNaN(parseInt(char)) || char === "." || char === ",") {
          return (
            <span key={index} className="text-white">
              {char}
            </span>
          );
        }

        const prevChar = prevDigits[index] || "0";
        let direction = "";
        if (char > prevChar) direction = "up";
        else if (char < prevChar) direction = "down";

        return (
          <div
            key={index}
            className="digit-container"
            style={{
              display: "inline-block",
              overflow: "hidden",
              height: "1em",
              verticalAlign: "top",
              perspective: "200px",
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.span
                key={`${char}-${index}`}
                custom={direction}
                initial={{
                  rotateX: direction === "up" ? 90 : direction === "down" ? -90 : 0,
                  color: direction === "up" ? "#00C805" : "#FF5000",
                  opacity: 0.7,
                  position: "absolute",
                }}
                animate={{
                  rotateX: 0,
                  color: "#FFFFFF",
                  opacity: 1,
                  position: "relative",
                }}
                exit={{
                  rotateX: direction === "up" ? -90 : direction === "down" ? 90 : 0,
                  color: direction === "up" ? "#00C805" : "#FF5000",
                  opacity: 0,
                  position: "absolute",
                }}
                transition={{
                  type: "spring",
                  bounce: 2,
                  stiffness: 400,
                  damping: 55,
                }}
                style={{
                  display: "flex",
                  whiteSpace: "nowrap",
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                }}
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedPrice;