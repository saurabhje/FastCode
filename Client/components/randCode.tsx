import React, { useEffect, useState } from "react";
import RandomCode from "./features/codeRandomizer";
import calculateWPM from "./features/wpmCalci";
import CodeInput from "./codeInput";
import CodeSnippet from "./codeComponent";

export default function CodeComponent() {
    const [randCode, setRandCode] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>("");
    const [numLines, setNumLines] = useState<number>(1);
    const [typedErr, setTypedErr] = useState<number[]>([]);
    const [animateError, setAnimateError] = useState<boolean>(false);
    const [animateIndex, setAnimateIndex] = useState<number | null>(null)
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState<string>('');
    const [accuracy, setAccuracy] = useState<string>('');
    const [codeLines, setCodeLines] = useState<string[]>([]);
    const [charMap, setCharMap] = useState(new Map<number, number>());

    useEffect(() => {
        const code = RandomCode();
        setRandCode(code);
        const lines = code.split('\n').map(line => line.trimEnd());
        setCodeLines(lines);
        //calculating to fix enter key event without completing the complete line length
        fillMap(lines)
    }, []);

    function fillMap(lines: string[]) {
        const charMap = new Map<number, number>();
        let cumulativeLength = 0;
        lines.forEach((line, index) => {
            //adding 1 for newLine character
            cumulativeLength += line.length + 1;
            charMap.set(index, cumulativeLength);
        });
        setCharMap(charMap)
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = event.target.value;
        if (!startTime) {
            setStartTime(new Date().getTime());
        }
        const typedLineIndex = val.split('\n').length - 1;
        const typedColumnIndex = val.split('\n')[typedLineIndex].length - 1;
        const correspondingChar = codeLines[typedLineIndex][typedColumnIndex];
        const typedChar = val.slice(-1);
        const isMatch = typedChar === correspondingChar;
        if (!isMatch) {
            if (!typedErr.includes(val.length - 1)) {
                setTypedErr(prevTypedErr => [...prevTypedErr, val.length - 1]);
                setAnimateIndex(typedLineIndex)
                setAnimateError(true);
                setTimeout(() => {
                    setAnimateError(false);
                }, 700);
            }
        } else {
            setInputValue(val);
            if (inputValue.length + 1 === randCode.length) {
                const { wpm, accuracy } = calculateWPM(startTime!, val, typedErr);
                setWpm(wpm);
                setAccuracy(accuracy);
                handleRestart();
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = event.currentTarget;
        let cursorPosition = textarea.selectionStart;
        const totalLines = inputValue.substring(0, cursorPosition).split('\n');
        const currentLineIndex = totalLines.length - 1;
        const currentLine = codeLines[currentLineIndex];
        const totalCharsUpToCurrentLine = charMap.get(currentLineIndex - 1) || 0;
        const textBeforeCursor = inputValue.substring(0, cursorPosition);
        const lastCharacter = textBeforeCursor.slice(-1);
        const nextLine = codeLines[totalLines.length]
        if (event.key === "Enter") {
            event.preventDefault();
            const isLast = cursorPosition - totalCharsUpToCurrentLine;
            const isEnd = isLast === currentLine.length;
            const matched = currentLine.slice(-1) === lastCharacter
            if (currentLine == "") {
                let updatedValue = inputValue + '\n'
                setNumLines(numLines + 1);
                setInputValue(updatedValue);
            }
            if (matched && isEnd) {
                let i = 0;
                while (i < nextLine.length) {
                    if (nextLine[i] === ' ') {
                        i++;
                    } else {
                        break;
                    }
                }
                textarea.selectionStart = textarea.selectionEnd = cursorPosition + i + 1;
                let updatedValue = inputValue + '\n' + ' '.repeat(i)
                setNumLines(numLines + 1);
                setInputValue(updatedValue);
            }
        }
        if (event.key === "Tab") {
            event.preventDefault();
        }
        if (event.key === "Backspace") {
            event.preventDefault();
        }
    };


    function handleRestart() {
        const code = RandomCode();
        setRandCode(code);
        const lines = code.split('\n');
        setCodeLines(lines);
        fillMap(lines)
        setStartTime(0);
        setInputValue("");
        setTypedErr([]);
        setNumLines(1);
        setAnimateError(false);
    }

    const getClassForIndex = (lineIndex: number, charIndex: number, char: string) => {
        const totalCharIndex = codeLines.slice(0, lineIndex).reduce((acc, line) => acc + line.length + 1, 0) + charIndex;
        let cn = '';
        if (totalCharIndex === inputValue.length) {
            cn = 'blinker ';
        }
        if (typedErr.includes(totalCharIndex)) {
            return cn + 'text-red-500';
        } else if (inputValue[totalCharIndex] && inputValue[totalCharIndex] === char) {
            return cn + 'text-zinc-500';
        } else {
            return cn + 'initial';
        }
    };

    return (
        <div className="mt-10 flex w-full flex-col lg:flex-row">
            <CodeSnippet codeLines={codeLines} getClassForIndex={getClassForIndex} animateError={animateError} animateIndex={animateIndex} />
            <CodeInput
                inputValue={inputValue}
                handleInputChange={handleInputChange}
                handleKeyPress={handleKeyPress}
                numLines={numLines}
                accuracy={accuracy}
                wpm={wpm}
            />
        </div>
    );
}
