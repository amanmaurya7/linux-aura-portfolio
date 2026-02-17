import React, { useState } from 'react';

const CalculatorApp = () => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState<string | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);

    const handleNumber = (num: string) => {
        if (waitingForNewValue) {
            setDisplay(num);
            setWaitingForNewValue(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    const handleOperator = (op: string) => {
        setOperator(op);
        setPreviousValue(display);
        setWaitingForNewValue(true);
    };

    const handleEqual = () => {
        if (!operator || !previousValue) return;

        const current = parseFloat(display);
        const previous = parseFloat(previousValue);
        let result = 0;

        switch (operator) {
            case '+': result = previous + current; break;
            case '-': result = previous - current; break;
            case '*': result = previous * current; break;
            case '/': result = previous / current; break;
        }

        setDisplay(String(result));
        setPreviousValue(null);
        setOperator(null);
        setWaitingForNewValue(true);
    };

    const handleClear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForNewValue(false);
    };

    const handlePercent = () => {
        const current = parseFloat(display);
        setDisplay(String(current / 100));
    };

    const handleSign = () => {
        const current = parseFloat(display);
        setDisplay(String(current * -1));
    };

    const btnClass = "h-14 w-14 rounded-full text-xl font-medium transition-all active:scale-95 flex items-center justify-center select-none shadow-sm";
    const grayBtn = "bg-gray-400 hover:bg-gray-300 text-black";
    const darkBtn = "bg-[#333333] hover:bg-[#444444] text-white";
    const orangeBtn = "bg-orange-500 hover:bg-orange-400 text-white";

    return (
        <div className="flex flex-col h-full bg-[#1C1C1E] text-white p-4 font-sans select-none items-center justify-center">
            <div className="w-full max-w-[280px] flex flex-col">
                <div className="flex-1 flex items-end justify-end mb-4 px-2 min-h-[80px]">
                    <div className="text-5xl font-light tracking-wide truncate w-full text-right">{display.slice(0, 9)}</div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    <button onClick={handleClear} className={`${btnClass} ${grayBtn}`}>AC</button>
                    <button onClick={handleSign} className={`${btnClass} ${grayBtn}`}>±</button>
                    <button onClick={handlePercent} className={`${btnClass} ${grayBtn}`}>%</button>
                    <button onClick={() => handleOperator('/')} className={`${btnClass} ${orangeBtn}`}>÷</button>

                    <button onClick={() => handleNumber('7')} className={`${btnClass} ${darkBtn}`}>7</button>
                    <button onClick={() => handleNumber('8')} className={`${btnClass} ${darkBtn}`}>8</button>
                    <button onClick={() => handleNumber('9')} className={`${btnClass} ${darkBtn}`}>9</button>
                    <button onClick={() => handleOperator('*')} className={`${btnClass} ${orangeBtn}`}>×</button>

                    <button onClick={() => handleNumber('4')} className={`${btnClass} ${darkBtn}`}>4</button>
                    <button onClick={() => handleNumber('5')} className={`${btnClass} ${darkBtn}`}>5</button>
                    <button onClick={() => handleNumber('6')} className={`${btnClass} ${darkBtn}`}>6</button>
                    <button onClick={() => handleOperator('-')} className={`${btnClass} ${orangeBtn}`}>−</button>

                    <button onClick={() => handleNumber('1')} className={`${btnClass} ${darkBtn}`}>1</button>
                    <button onClick={() => handleNumber('2')} className={`${btnClass} ${darkBtn}`}>2</button>
                    <button onClick={() => handleNumber('3')} className={`${btnClass} ${darkBtn}`}>3</button>
                    <button onClick={() => handleOperator('+')} className={`${btnClass} ${orangeBtn}`}>+</button>

                    <button onClick={() => handleNumber('0')} className={`${btnClass} ${darkBtn} col-span-2 w-[124px] rounded-[28px] !items-center !justify-start pl-6`}>0</button>
                    <button onClick={() => handleNumber('.')} className={`${btnClass} ${darkBtn}`}>.</button>
                    <button onClick={handleEqual} className={`${btnClass} ${orangeBtn}`}>=</button>
                </div>
            </div>
        </div>
    );
};

export default CalculatorApp;
