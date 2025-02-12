import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrevious } from "../hooks/anim_hook";

function formatForDisplay(number: number = 0): string[] {
  const formattedNumber = Math.max(number, 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedNumber.split('').reverse();
}

function DecimalColumn() {
  return (
    <div>
      <span>.</span>
    </div>
  );
}

interface NumberColumnProps {
  digit: string;
  delta: string | null;
}

function NumberColumn({ digit, delta }: NumberColumnProps) {
  const [position, setPosition] = useState(0);
  const [animationClass, setAnimationClass] = useState<string | null>(null);
  const previousDigit = usePrevious(digit);
  const columnContainer = useRef<HTMLDivElement>(null);

  const setColumnToNumber = (number: string) => {
    if (columnContainer.current) {
      setPosition(columnContainer.current.clientHeight * parseInt(number, 10));
    }
  };

  useEffect(() => setAnimationClass(previousDigit !== digit ? delta : ""), [
    digit,
    delta
  ]);

  useEffect(() => setColumnToNumber(digit), [digit]);

  return (
    <div className="ticker-column-container" ref={columnContainer}>
      <motion.div
        animate={{ y: position }}
        className={`ticker-column ${animationClass}`}
        onAnimationComplete={() => setAnimationClass("")}
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
          <div key={num} className="ticker-digit">
            <span>{num}</span>
          </div>
        ))}
      </motion.div>
      <span className="number-placeholder">0</span>
    </div>
  );
}

interface AnimatingNumberProps {
  value: number;
}

const AnimatingNumber = ({ value }: AnimatingNumberProps) => {
  const numArray = formatForDisplay(value);
  const previousNumber = usePrevious(value);

  let delta: string | null = null;
  if (value > previousNumber) delta = "increase";
  if (value < previousNumber) delta = "decrease";

  return (
    <motion.div layout className="ticker-view text-2xl sm:text-3xl md:text-4xl ">
      {numArray.map((char, index) => {
        if (char === ",") {
          return (
            <div key={index} className="ticker-comma text-2xl sm:text-3xl md:text-4xl" >
              <span>,</span>
            </div>
          );
        } else if (char === ".") {
          return <DecimalColumn key={index} />;
        } else {
          return <NumberColumn key={index} digit={char} delta={delta} />;
        }
      })}
    </motion.div>
  );
};

export default AnimatingNumber;