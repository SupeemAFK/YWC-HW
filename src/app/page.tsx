"use client"

import Card from "./components/Card";
import UpDown from "./components/Animated/UpDown"
import Fade from "./components/Animated/Fade";
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Major } from "./types/MajorEnum";
import { useState } from "react";
import Form from "./components/Form";

export default function Home() {
  const [major, setMajor] = useState<Major | null>(null);

  return (
    <div className={`${major ? "h-screen" : "lg:h-screen"} flex items-center justify-center p-10 font-prompt`}>
      {major ? (
        <Fade animKey="form">
          <Form major={major} />
        </Fade>
      ) : (
        <Fade animKey="select">
          <div>
            <UpDown className="flex justify-center items-center">
              <h1 className="text-3xl lg:text-5xl">
                เลือกสาขาที่คุณสมัคร
              </h1>
              <ChevronDownIcon />
            </UpDown>
          </div>
          <div className="mt-3">
            <div className="flex flex-col lg:flex-row gap-3">
              <Card handleClick={() => setMajor(Major.Design)} major={Major.Design} />
              <Card handleClick={() => setMajor(Major.Programming)} major={Major.Programming} />
            </div>
            <div className="mt-3 flex flex-col lg:flex-row gap-3">
              <Card handleClick={() => setMajor(Major.Marketing)} major={Major.Marketing} />
              <Card handleClick={() => setMajor(Major.Content)} major={Major.Content}/>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
}
