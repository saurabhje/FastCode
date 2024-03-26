'use client'
import React, {useState } from "react";
import './page.css';
import RandPhrase from "@/components/randPhrase";
import RandCode from "@/components/randCode";
export default function TypingGame() {
  const [mode, setMode] = useState<string>('code');
  
  function handleMode(){
    mode == 'code' ? setMode('text') : setMode('code') 
  }

  return (
    <main className="px-4 lg:px-20 flex flex-col items-center">
      <button 
        onClick={handleMode}
        className="bg-zinc-800 text-white rounded-md p-1"
        >
          TextCode
      </button>
      {mode == 'text'? <RandPhrase /> : <RandCode /> }
    </main>

  );
}
