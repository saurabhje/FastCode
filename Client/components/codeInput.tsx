import Stats from "./stats";
import { useEffect, useRef } from "react";

interface CodeInputProps {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  numLines: number;
  accuracy: string;
  wpm: string;
}
function CodeInput({
  inputValue,
  handleInputChange,
  handleKeyPress,
  numLines,
  accuracy,
  wpm,
}: CodeInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeydown = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
    handleKeydown()
    window.addEventListener('keydown', handleKeydown)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  })
  return (
    <div className="w-3/4 lg:w-1/2 ml-5 lg:ml-0">
      <textarea
        ref={inputRef}
        className={`text-lg w-full mt-5 lg:mt-0 self-start lg:text-normal border-b-2 bg-transparent text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-foreground focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 duration-300 ease-in-out border-b-${numLines} resize-none`}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        rows={numLines}
        spellCheck="false"
      />
      <Stats accuracy={accuracy} wpm={wpm} />
    </div>
  );
}
export default CodeInput;