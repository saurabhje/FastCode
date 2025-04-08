'use client'
import React, { useEffect, useState } from "react";
import RandPhrase from "@/components/randPhrase";
import CodeComponent from "@/components/randCode";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

type TypingGameProps = {
  present: boolean;
};

export default function TypingGame(props: TypingGameProps) {
  const { present } = props;
  const [mode, setMode] = useState<string>('text');
  const [ranked, setRanked] = useState(false);
  const [language, setLanguage] = useState<string>('');

  useEffect(() => {
    const savedValue = window.localStorage.getItem("ranked");
    if (savedValue !== null) {
      setRanked(JSON.parse(savedValue));
    }
  }, []);

  function handleMode() {
    mode === 'code' ? setMode('text') : setMode('code');
  }


  function handleCheck() {
    const newRanked = !ranked;
    setRanked(newRanked);
    window.localStorage.setItem("ranked", JSON.stringify(newRanked));
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            className="rounded-[2px]"
            disabled={!present}
            checked={ranked}
            onCheckedChange={handleCheck}
          />
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Record Test Stats
          </label>
        </div>
        {
          mode == 'code' ?
            <select
              id="langs"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-[180px] text-sm rounded-sm border border-1 border-neutral-500 p-2"
            >
              <option value="">Languages</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="js">Javascript</option>
              <option value="rust">Rust</option>
              <option value="go">Go</option>
            </select>
            : null
        }
        <div className="flex items-center gap-1.5 ">
          <label htmlFor="moder" className="text-base">Text</label>
          <Switch id="moder" className="data-[state=unchecked]:bg-foreground" onClick={handleMode} />
          <label htmlFor="moder" className="text-base">Code</label>
        </div>
      </div>
      {mode === 'text' ? <RandPhrase ranked={ranked} /> : <CodeComponent key={language} ranked={ranked} language={language} />}
    </div>
  );
}