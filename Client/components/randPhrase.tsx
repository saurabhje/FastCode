import React, { useEffect, useRef, useState } from 'react';
import Stats from './stats';
import getRandomPhrase from './features/textRandomizer';
import calculateWPM from './features/wpmCalci';
import SendtestData from './features/sendData';
import KeyboardLayout from './keyboard';

type randPhraseprop = {
    ranked: boolean;
  };
export default function RandPhrase(prop: randPhraseprop) {
    const {ranked} = prop;
    const [randPhrase, setRandPhrase] = useState<string>('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [typedChars, setTypedChars] = useState<string>("");
    const [wpm, setWpm] = useState<string>('');
    const [typedErr, setTypedErr] = useState<number[]>([]);
    const [animateError, setAnimateError] = useState<boolean>(false);
    const [accuracy, setAccuracy] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setRandPhrase(getRandomPhrase())
        const handleKeydown = () =>{
            if (inputRef.current){
                inputRef.current.focus();
            }
        }
        window.addEventListener('keydown', handleKeydown)
        return () =>{
            window.removeEventListener('keydown', handleKeydown) 
        }
    }, [])
    
    function handleRestart() {
        setRandPhrase(getRandomPhrase());
        setStartTime(null);
        setTypedChars("");
        setTypedErr([]);
        setAnimateError(false);
      }


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (!startTime) {
          setStartTime(new Date().getTime());
        }
        const typedChar = value.slice(-1);
        const randomChar = randPhrase.charAt(value.length - 1);
        const isMatch = typedChar === randomChar;
    
        if (!isMatch) {
          if (!typedErr.includes(value.length - 1)) {
            setTypedErr(prevTypedErr => [...prevTypedErr, value.length - 1]);
            setAnimateError(true);
            setTimeout(() => {
              setAnimateError(false);
            }, 700);
          }
        } else {
          setTypedChars(value);
          if (value.length === randPhrase.length) {
            const { wpm, accuracy } = calculateWPM(startTime!, value, typedErr);
            setWpm(wpm);
            setAccuracy(accuracy);
            console.log("handleChange - SendtestData condition:", ranked);
            if (ranked){
                SendtestData(wpm, accuracy, 'text')
            };
            handleRestart();
          }
        }
      }
      const getClassForIndex = (index: number) => {
        let cn  = '';
        if (index=== typedChars.length) {
            cn =  'blinker '; // Apply the blinker class to the current character being typed
        }
        if (typedChars[index] && !typedErr.includes(index)) {
            return cn + 'text-zinc-500';
        } else if (typedErr.includes(index)) {
            return cn + 'text-red-500';
        }
    };
    
    return (
        <div className='w-full md:w-3/4 mt-10'>
            <p className={`w-full text-xl mb-6 ${animateError ? 'animate-bounce1' : ''}`}>
                {randPhrase.split('').map((char, index) => (
                    <span
                        key={index}
                        className={getClassForIndex(index)}
                    >
                        {char}
                    </span>
                ))}
            </p>
            <input
                ref={inputRef}
                className="w-full text-xl border-b-2 border-bborder bg-transparent text-blue-gray-700 outline-none transition-all placeholder-shown:border-blue-gray-200 focus:border-foreground focus:outline-none disabled:border-0 disabled:bg-blue-gray-50 duration-1000 ease-in-out"
                value={typedChars}
                spellCheck= 'false'
                onChange={handleChange}
                onKeyDown={(event) => {
                    if (event.key === 'Backspace') {
                        event.preventDefault();
                    }
                }}
            />
            <Stats accuracy={accuracy} wpm={wpm} />
            <KeyboardLayout />
        </div>
    )
}
