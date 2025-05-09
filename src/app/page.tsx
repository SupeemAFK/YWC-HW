"use client"

import Card from "./components/Card";
import UpDown from "./components/Animated/UpDown"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Major } from "./types/MajorEnum";
import { useState } from "react";

export default function Home() {
  const [changeToInput, setChangeToInput] = useState(false);

  return (
    <div className="lg:h-screen flex items-center justify-center p-10">
      <div>
        <div>
          <UpDown className="flex justify-center items-center">
            <h1 className="font-prompt text-3xl lg:text-5xl">
              เลือกสาขาที่คุณสมัคร
            </h1>
            <ChevronDownIcon />
          </UpDown>
        </div>
        <div className="mt-3">
          <div className="flex flex-col lg:flex-row gap-3">
            <Card handleClick={() => setChangeToInput(true)} major={Major.Design} />
            <Card handleClick={() => setChangeToInput(true)} major={Major.Programming} />
          </div>
          <div className="mt-3 flex flex-col lg:flex-row gap-3">
            <Card handleClick={() => setChangeToInput(true)} major={Major.Marketing} />
            <Card handleClick={() => setChangeToInput(true)} major={Major.Content}/>
          </div>
        </div>
      </div>
    </div>
  );
}
