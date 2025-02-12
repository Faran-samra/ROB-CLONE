import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

interface StockChartProps {
    value: number[];
    isnegative?: boolean;
}

const StockChart: React.FC<StockChartProps> = ({ value, isnegative }) => {
    return (
        <Sparklines data={value} width={100} height={30} margin={5}>
            <SparklinesLine color={isnegative ? "#ff5000" : "#00ff00"} style={{ strokeWidth: 1 }} />
        </Sparklines>
    );
};

export default StockChart;
