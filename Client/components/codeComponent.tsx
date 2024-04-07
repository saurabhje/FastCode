import React from "react";

interface CodeSnippetProps {
    codeLines: string[];
    getClassForIndex: (lineIndex: number, charIndex: number, char: string) => string;
    animateError: boolean;
    animateIndex: number | null;
}

function CodeSnippet({ codeLines, getClassForIndex, animateError, animateIndex }: CodeSnippetProps) {
    return (
        <pre className="ml-5 w-2/3 mt-1 text-lg font-mono font-normal leading-snug">
            {codeLines.map((line, lineIndex) => (
                <div key={lineIndex} className={animateError && animateIndex == lineIndex? 'animate-bounce1' : ''} >
                    {line.split('').map((char, charIndex) => (
                        <span
                            key={charIndex}
                            className={getClassForIndex(lineIndex, charIndex, char)}>
                            {char}
                        </span>
                    ))}
                    {'\n'}
                </div>
            ))}
        </pre>
    );
}

export default CodeSnippet;
