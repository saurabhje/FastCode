'use client'
import React, { useState } from "react";
import RandPhrase from "@/components/randPhrase";
import RandCode from "@/components/randCode";
import { Switch } from "@/components/ui/switch"

export default function TypingGame() {
  const [mode, setMode] = useState<string>('text');

  function handleMode() {
    mode == 'code' ? setMode('text') : setMode('code')
  }
  return (
    <div className="py-4 px-4 lg:px-20 flex flex-col items-center">
      <div className="self-end flex items-center gap-1.5">
        <label htmlFor="moder" className="text-base">Text</label>
        <Switch id="moder" className="data-[state=unchecked]:bg-foreground" onClick={handleMode} />
        <label htmlFor="moder" className="text-base">Code</label>
      </div>
      {mode == 'text' ? <RandPhrase /> : <RandCode />}
    </div>
  );
}
