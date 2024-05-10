import React, { useState, useEffect } from 'react';

const KeyboardLayout = () => {
  const [pressedKey, setPressedKey] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = e.code;
      setPressedKey(keys)
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKey('')
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });

  const firstRow = [ ['Digit1', '1'], ['Digit2', '2'], ['Digit3', '3'], ['Digit4', '4'], ['Digit5', '5'], ['Digit6', '6'], ['Digit7', '7'], ['Digit8', '8'], ['Digit9', '9'], ['Digit0', '0'], ['Minus', '-'], ['Equal', '='] ]
  const secondRow = [ ['KeyQ', 'Q'], ['KeyW', 'W'], ['KeyE', 'E'], ['KeyR', 'R'], ['KeyT', 'T'], ['KeyY', 'Y'], ['KeyU', 'U'], ['KeyI', 'I'], ['KeyO', 'O'], ['KeyP', 'P'], ['BracketLeft', '['], ['BracketRight', ']'], ['Backslash', '\\'] ]
  const thirdRow = [ ['KeyA', 'A'], ['KeyS', 'S'], ['KeyD', 'D'], ['KeyF', 'F'], ['KeyG', 'G'], ['KeyH', 'H'], ['KeyJ', 'J'], ['KeyK', 'K'], ['KeyL', 'L'], ['Semicolon', ';'], ['Quote', '`'] ]

  const fourthRow = [ ['KeyZ', 'Z'], ['KeyX', 'X'], ['KeyC', 'C'], ['KeyV', 'V'], ['KeyB', 'B'], ['KeyN', 'N'], ['KeyM', 'M'], ['Comma', ','], ['Period', '.'], ['Slash', '/'] ]

  return (
    <div id="keyboard" className="my-20 flex flex-col max-w-[1008px] min-w-[600px] w-full bg-black text-white p-1 rounded overflow-x-hidden">
      <div className="flex">
        <div className={`key flex justify-center items-center h-10 min-w-10 flex-grow m-1 ${pressedKey == 'Backquote' ? 'bg-zinc-400' : 'bg-red-800 transition-colors duration-500'}`}>`</div>
        {firstRow.map((key, index) => (
          <div
            key={index}
            className={`key flex justify-center items-center h-10 w-10 m-1 ${pressedKey == key[0] ? 'bg-zinc-400' : 'bg-neutral-600 transition-colors duration-500'}`}
          >
            {key[1]}
          </div>
        ))}
        <div className={`key flex justify-center items-center h-10 flex-grow m-1 ${pressedKey == 'Backspace' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>backspace</div>
      </div>
      <div className="flex">
        <div className={`key flex justify-center items-center h-10 w-28 m-1 ${pressedKey == 'Tab' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>tab</div>
        {secondRow.map((key, index) => (
          <div
            key={index}
            className={`key flex justify-center items-center h-10 w-10  m-1 ${pressedKey == key[0] ? 'bg-zinc-400' : 'bg-neutral-600 transition-colors duration-500'}`}
          >
            {key[1]}
          </div>
        ))}
      </div>
      <div className="flex">
        <div className={`key flex justify-center items-center h-10 flex-grow m-1 ${pressedKey == 'CapsLock' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>capslock</div>
        {thirdRow.map((key, index) => (
          <div
            key={index}
            className={`key flex justify-center items-center h-10 w-10 m-1 ${pressedKey == key[0] ? 'bg-zinc-400' : 'bg-neutral-600 transition-colors duration-500'}`}
          >
            {key[1]}
          </div>
        ))}
        <div className={`key flex justify-center items-center h-10 flex-grow m-1 ${pressedKey == 'Enter' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>enter</div>
      </div>
      <div className="flex">
        <div className={`key flex justify-center items-center h-10 flex-grow m-1 ${pressedKey == 'ShiftLeft' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>shift</div>
        {fourthRow.map((key, index) => (
          <div
            key={index}
            className={`key flex justify-center items-center h-10 w-10 m-1 ${pressedKey == key[0] ? 'bg-zinc-400' : 'bg-neutral-600 transition-colors duration-500'}`}
          >
            {key[1]}
          </div>
        ))}
        <div className={`key flex justify-center items-center h-10 flex-grow m-1 ${pressedKey == 'ShiftRight' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>shift</div>
      </div>
      <div className="flex">
        <div className={`key flex justify-center items-center h-10 w-10 m-1 ${pressedKey =='ControlLeft' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>ctrl</div>
        <div className={`key flex justify-center items-center h-10 w-10 m-1 ${pressedKey == 'AltLeft' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>alt</div>
        <div className={`key flex justify-center items-center h-10 w-10 m-1 ${pressedKey == 'MetaLeft' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>win</div>
        <div className={`key flex justify-center items-center h-10 flex-grow  m-1 ${pressedKey == 'Space' ? 'bg-zinc-400' : 'bg-neutral-600 transition-colors duration-500'}`}>Space</div>
        <div className={`key flex justify-center items-center h-10 w-10 m-1 ${pressedKey =='AltRight' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>alt</div>
        <div className={`key flex justify-center items-center h-10 w-10 m-1 ${pressedKey == 'Fn' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>fn</div>
        <div className={`key flex justify-center items-center h-10 w-10 m-1 ${pressedKey =='ControlRight' ? 'bg-zinc-400' : 'bg-neutral-800 transition-colors duration-500'}`}>ctrl</div>
      </div>
    </div>
  );
};

export default KeyboardLayout;
