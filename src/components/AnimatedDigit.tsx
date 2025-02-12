import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedDigit = ({
  digit,
  color,
  direction,
}: {
  digit: string;
  color: string;
  direction?: "up" | "down";
}) => {
  const [position, setPosition] = useState(0);
  const [displayColor, setDisplayColor] = useState("white"); // Default color
  const [previousDigit, setPreviousDigit] = useState(digit);

  useEffect(() => {
    if (digit !== previousDigit) {
      setPosition(direction === "up" ? -30 : 30);
      setDisplayColor(color); // Change color to green/red

      setTimeout(() => {
        setPosition(0);
        setPreviousDigit(digit);
      }, 0);

      setTimeout(() => {
        setDisplayColor("white"); // Reset color after animation
      }, 500); // Adjust timing as needed
    }
  }, [digit, previousDigit, direction, color]);

  return (
    <motion.span
      style={{
        color: displayColor,
        display: "inline-block",
        minWidth: "1ch",
        textAlign: "center",
      }}
      animate={{ y: position }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {digit}
    </motion.span>
  );
};

export default AnimatedDigit;
