import React from 'react'
import { CandidatesResponse } from '../actions/checkCandidate';
import { DataTable } from './data-table';
import { CandidateColumn, columns } from "./columns"
import Link from 'next/link';
import Fade from '../components/Animated/Fade';
import { Pencil1Icon } from '@radix-ui/react-icons';

async function getData() {
    const res = await fetch("https://api.ywc20.ywc.in.th/homework/candidates", {
        headers: {
            "x-reference-id": "PG-39"
        }
    })
    const data: CandidatesResponse = await res.json();
    const allCandidates: CandidateColumn[] = Object.values(data).flat();
    return allCandidates;
}

async function TablePage() {
    const data = await getData();

  return (
    <div className='h-screen relative font-prompt overflow-hidden py-10'>
        <Fade animKey='table' className='w-full h-full flex flex-col items-center justify-center'>
            <div className='flex items-center relative'>
                <div className="absolute w-72 h-72 rounded-full bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 opacity-10 blur-3xl pointer-events-none transition-all duration-700 group-hover:opacity-0">
                </div>
                <h1 className="text-3xl lg:text-5xl">
                    Table View
                </h1>
                <Pencil1Icon className='ml-2' />
            </div>
            <div className='mt-10 lg:w-4xl w-full h-[50rem] overflow-y-scroll border-2 border-[#1c1917] bg-black p-5 rounded-md'>
                <DataTable columns={columns} data={data} />
            </div>
            <div className='mt-10'>
                <Link className='cursor-pointer inline p-2 border-[0.1rem] border-white rounded-md hover:opacity-50 transition-all duration-300' href="/">กลับสู่หน้าหลัก</Link>
            </div>
        </Fade>
        <div className="absolute bottom-[-30rem] left-[-20rem] w-[50rem] h-[50rem] rounded-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% lg:opacity-10 opacity-5 blur-3xl pointer-events-none transition-all duration-300">
        </div>
        <div className="absolute bottom-[-30rem] right-[-20rem] w-[50rem] h-[50rem] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 lg:opacity-10 opacity-5 blur-3xl pointer-events-none transition-all duration-300">
        </div>
    </div>
  )
}

export default TablePage