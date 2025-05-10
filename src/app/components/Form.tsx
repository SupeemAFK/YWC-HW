"use client"

import React from 'react'
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import { checkCandidate } from '../actions/checkCandidate'
import { Major } from '../types/MajorEnum'
import { Result } from '../page'

interface Props {
    major: Major
    submitCallback: (result: Result) => void;
}

const FormSchema = z.object({
    firstname: z.string(),
    lastname: z.string()
});
type FormSchemaType = z.infer<typeof FormSchema>;

function Form(props: Props) {
    const { handleSubmit, register } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        const candidate = await checkCandidate(values.firstname, values.lastname, props.major);
        if (candidate) return props.submitCallback({ candidate, pass: true });
        return props.submitCallback({ candidate: null, pass: false });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-center">
                <h1 className="font-prompt text-3xl lg:text-5xl">
                    กรอกข้อมูล
                </h1>
                <ChevronDownIcon />
            </div>
            <div className="mt-3">
                <input {...register("firstname", { required: true })} className="w-full p-2 border-[0.01rem] border-white rounded-md" placeholder="กรอกชื่อ" />
                <input {...register("lastname", { required: true })} className="mt-2 w-full p-2 border-[0.01rem] border-white rounded-md" placeholder="กรอกนามสกุล" />
            </div>
            <div className="mt-3 flex justify-center items-center">
                <button type='submit' className="text-black cursor-pointer p-2 rounded-md bg-white lg:opacity-50 hover:opacity-100 transition-all duration-200">ตรวจสอบผลการคัดเลือก 🎉</button>
            </div>
        </form>
    )
}

export default Form