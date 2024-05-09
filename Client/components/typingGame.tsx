'use client'
import React, { useState } from "react";
import RandPhrase from "@/components/randPhrase";
import RandCode from "@/components/randCode";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

type TypingGameProps = {
  present: boolean;
};

export default function TypingGame(props: TypingGameProps) {
  const { present } = props;
  const [mode, setMode] = useState<string>('text');
  const [ranked, setRanked] = useState(false);

  function handleMode() {
    mode === 'code' ? setMode('text') : setMode('code');
  }

  return (
    <div className="flex flex-col items-center py-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            className="rounded-[2px]"
            disabled={!present}
            onCheckedChange={() => setRanked(prevRanked => !prevRanked)}
          />
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Record Test Stats
          </label>
        </div>
        <div className="flex items-center gap-1.5 ">
          <label htmlFor="moder" className="text-base">Text</label>
          <Switch id="moder" className="data-[state=unchecked]:bg-foreground" onClick={handleMode} />
          <label htmlFor="moder" className="text-base">Code</label>
        </div>
      </div>
      {mode === 'text' ? <RandPhrase ranked={ranked} /> : <RandCode ranked={ranked} />}
    </div>
  );
}