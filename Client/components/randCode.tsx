import React, { useEffect, useRef, useState } from "react";
import RandomCode from "./features/codeRandomizer";
import calculateWPM from "./features/wpmCalci";
import SendtestData from "./features/sendData";
import Stats from "./stats";
type codeComponentprop = {
    ranked: boolean;
    language: string;
};


export default function CodeComponent(prop: codeComponentprop) {
    const { ranked, language } = prop;
    const [randCode, setRandCode] = useState<string>('');
    const [animateError, setAnimateError] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState<string>('');
    const [accuracy, setAccuracy] = useState<string>('');
    const [curCharIndex, setCurCharIndex] = useState<number>(0);
    const [curLine, setCurLine] = useState<number>(0);
    const lineRef = useRef<number>(0);
    const [errors, setErrors] = useState<Set<number>>(new Set());

    useEffect(() => {
        setRandCode(RandomCode(language).replace(/\t/g, '    '));
        setCurCharIndex(0);
    }, [language]);

    function Identation(line: string): number {
        let i = 0;
        while (i < line.length && line[i] === " ") {
            i++;
        }
        return i;
    }
    function handleRestart() {
        setRandCode(RandomCode(language).replace(/\t/g, '    '));
        setCurCharIndex(0);
        setErrors(new Set());
        setCurLine(0);
        lineRef.current = 0;
        return;
    }

    useEffect(() => {
        const handleTyping = (event: KeyboardEvent) => {
            const key = event.key;
            event.preventDefault();
            if (!startTime) {
                setStartTime(new Date().getTime());
            }
            if (!randCode.length) return;
            const expectedChar = randCode[curCharIndex];
            if (curCharIndex === randCode.length - 1){
                if (key === expectedChar) {
                    const { wpm, accuracy } = calculateWPM(startTime!, randCode, Array.from(errors));
                    setWpm(wpm)
                    setAccuracy(accuracy)
                    if (ranked) SendtestData(wpm, accuracy, 'code')
                    handleRestart()
                    return;
                }
            }
            if (key === 'Shift') return;
            if (key === 'Enter' && expectedChar == "\n") {
                const nextLine = randCode.split('\n')[curLine + 1];
                if (nextLine === undefined) return;
                let indexSkipped = Identation(nextLine)
                setCurCharIndex(curCharIndex + indexSkipped + 1)
                setCurLine((prev) => {
                    const newLine = curLine + 1
                    lineRef.current = newLine
                    return newLine
                })
                return;
            }
            if (key === expectedChar) {
                setCurCharIndex((prev) => prev + 1);
            } else {
                setAnimateError(true);
                setErrors((prev) => {
                    const newSet = new Set(prev)
                    newSet.add(curCharIndex);
                    return newSet
                })
                setTimeout(() => setAnimateError(false), 300);
            }
        };
        window.addEventListener("keydown", handleTyping);
        return () => window.removeEventListener("keydown", handleTyping);
    }, [curCharIndex, randCode]);
    
    
    const getClassForIndex = (globalIndex: number) => {
        let cn = '';
        if (globalIndex === curCharIndex) {
            cn += 'blinker ';
        }  
        if (errors.has(globalIndex)) {
            cn += 'text-red-500';
            
        } else if (globalIndex < curCharIndex) {
            cn += 'text-neutral-500';
        } else {
            cn += 'initial';
        }   
        return cn.trim();
    };
    
    let globalIndex = 0;
    return (
        <div className="mt-10 flex w-full flex-col lg:flex-row lg:justify-around">
            <pre className="w-full ml-3 mt-1 text-base font-mono font-normal leading-snug">
                {randCode.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex} className={animateError && lineRef.current == lineIndex ? 'animate-bounce1' : ''}>
                        {line.split('').map((char) => {
                            const span = (
                                <span key={globalIndex} className={getClassForIndex(globalIndex)}>
                                    {char}
                                </span>
                            );
                            globalIndex++;
                            return span;
                        })}
                        {globalIndex < randCode.length && (
                            <span key={globalIndex} className={getClassForIndex(globalIndex)}>
                                {'↵'}
                            </span>
                        )}
                        {(() => { globalIndex++; return null })()}
                    </div>
                ))}
            </pre>
            <div className="flex flex-col w-2/3 lg:w-1/3">
                <div className="self-center"> <Stats wpm={wpm} accuracy={accuracy}/></div>
                <div className="mt-2 w-full border border-gray-500"></div>
            </div>
        </div>
    );
}