"use client"

import React, { useState } from 'react'
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import { checkCandidate } from '../actions/checkCandidate'
import { Major } from '../types/MajorEnum'
import { Result } from '../page'
import Loading from './Animated/Loading'
import { AnimatePresence, motion } from 'motion/react'

const loadingVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.05 } },
};

interface Props {
    major: Major
    submitCallback: (result: Result) => void;
}

const FormSchema = z.object({
    firstname: z.string().min(1, "จำเป็นต้องใส่ชื่อ"),
    lastname: z.string().min(1, "จำเป็นต้องใส่นามสกุล")
});
type FormSchemaType = z.infer<typeof FormSchema>;

function Form(props: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const { handleSubmit, register, formState: { errors} } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        setIsLoading(true)
        const candidate = await checkCandidate(values.firstname, values.lastname, props.major);
        setIsLoading(false)
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
            <div className="mt-5">
                <input {...register("firstname", { required: true })} className={`${errors.firstname ? "border-red-500" : "border-white"} w-full p-2 border-[0.01rem] rounded-md transition-all duration-200`} placeholder="กรอกชื่อ" />
                {errors.firstname && <span className='text-red-500'>{errors.firstname.message}</span>}
                <input {...register("lastname", { required: true })} className={`${errors.firstname ? "border-red-500" : "border-white"} mt-2 w-full p-2 border-[0.01rem] rounded-md transition-all duration-200`} placeholder="กรอกนามสกุล" />
                {errors.lastname && <span className='text-red-500'>{errors.lastname.message}</span>}
            </div>
            <div className="mt-10 flex justify-center items-center">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            className="flex flex-col items-center justify-center p-2"
                            variants={loadingVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <Loading />
                            <p className="text-xl">กำลังตรวจสอบ...</p>
                        </motion.div>
                    ) : (
                        <motion.button
                            key="button"
                            type="submit"
                            className="text-black cursor-pointer p-2 rounded-md bg-white lg:opacity-50 hover:opacity-100 transition-all duration-200"
                            variants={loadingVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            ตรวจสอบผลการคัดเลือก 🎉
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </form>
    )
}

export default Form