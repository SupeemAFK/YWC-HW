"use client"

import Card from "./components/Card";
import UpDown from "./components/Animated/UpDown"
import Fade from "./components/Animated/Fade";
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Major } from "./types/MajorEnum";
import { useState } from "react";
import Form from "./components/Form";
import { Candidate } from "./actions/checkCandidate";
import Link from "next/link";
import Firework from "./components/Animated/Fireworks";
import SadEffect from "./components/Animated/SadEffect";

export interface Result {
  candidate: Candidate | null
  pass: boolean
}

export default function Home() {
  const [major, setMajor] = useState<Major | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  if (result && result.pass && result.candidate) {
    return (
      <div className="h-screen relative flex items-center justify-center p-10 font-prompt overflow-hidden">
        <Firework />
        <div className="absolute w-96 h-96 rounded-full bg-green-400 opacity-20 blur-3xl pointer-events-none transition-all duration-200 group-hover:opacity-0">
          </div>
        <Fade animKey="candidate">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-3xl">
              <h1>ขอแสดงความยินดี!</h1>
              <p>คุณ {result.candidate.firstName} {result.candidate.lastName}</p>
            </div>
            <div className="mt-5 text-xl">
              <p>เลขประจำตัวสาขา: {result.candidate.interviewRefNo}</p>
            </div>
            <div className="mt-5 text-3xl flex flex-col items-center justify-center">
              <p>ผ่านเข้ารอบสัมภาษณ์ สาขา {formatLabel(result.candidate.major)} 🎉</p>
              <p>Young Webmaster Camp 20</p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <button 
              onClick={() => {
                setMajor(null);
                setResult(null);
              }} 
              className='cursor-pointer flex items-center p-2 border-[0.1rem] border-white rounded-md hover:opacity-50 transition-all duration-300'
            >
              กลับหน้าหลัก
            </button>
          </div>
        </Fade>
      </div>
    )
  }
  else if (result && !result.pass) {
    return (
      <div className="h-screen relative flex items-center justify-center p-10 font-prompt overflow-hidden">
        <SadEffect />
        <div className="absolute w-96 h-96 rounded-full bg-red-400 opacity-20 blur-3xl pointer-events-none transition-all duration-200 group-hover:opacity-0">
          </div>
        <Fade animKey="ineligible">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl">ขอแสดงความเสียใจคุณไม่ผ่านการคัดเลือก</h1>
            <p className="text-xl mt-5">ครั้งนี้อาจจะยังไม่ถึงเวลาของคุณ เรารู้สึกขอบคุณและซาบซึ้งในคำตอบของคุณมากๆ</p>  
            <p className="text-2xl mt-5">อย่าพึ่งยอมแพ้พยายามเข้าล่ะ สู้ๆ! 🏃</p>        
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <button 
              onClick={() => {
                setMajor(null);
                setResult(null);
              }} 
              className='cursor-pointer flex items-center p-2 border-[0.1rem] border-white rounded-md hover:opacity-50 transition-all duration-300'
            >
              กลับหน้าหลัก
            </button>
          </div>
        </Fade>
      </div>
    )
  }

  function handleSubmitCallback(result: Result) {
    setResult(result);
  }

  function formatLabel(input: string): string {
    return input
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }


  return (
    <div className={`${major ? "h-screen" : "lg:h-screen"} relative flex items-center justify-center p-10 font-prompt overflow-hidden`}>
      {major ? (
        <Fade animKey="form">
          <Form submitCallback={handleSubmitCallback} major={major} />
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
          <div className="mt-3 relative group">
            <div className="absolute w-full h-full rounded-full bg-linear-to-r/increasing from-indigo-500 to-teal-400 opacity-10 blur-3xl pointer-events-none transition-all duration-700 group-hover:opacity-0">
            </div>

            <div className="flex flex-col lg:flex-row gap-3">
              <Card handleClick={() => setMajor(Major.Design)} major={Major.Design} />
              <Card handleClick={() => setMajor(Major.Programming)} major={Major.Programming} />
            </div>

            <div className="mt-3 flex flex-col lg:flex-row gap-3">
              <Card handleClick={() => setMajor(Major.Marketing)} major={Major.Marketing} />
              <Card handleClick={() => setMajor(Major.Content)} major={Major.Content}/>
            </div>
          </div>
          <div className="mt-10 w-full flex items-center justify-center">
            <Link className='cursor-pointer inline p-2 border-[0.1rem] border-white rounded-md hover:opacity-50 transition-all duration-300' href="/table">View Table</Link>
          </div>
        </Fade>
      )}
      <div className="absolute bottom-[-30rem] left-[-20rem] w-[50rem] h-[50rem] rounded-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% lg:opacity-10 opacity-5 blur-3xl pointer-events-none transition-all duration-300">
      </div>
      <div className="absolute bottom-[-30rem] right-[-20rem] w-[50rem] h-[50rem] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 lg:opacity-10 opacity-5 blur-3xl pointer-events-none transition-all duration-300">
      </div>
    </div>
  );
}
