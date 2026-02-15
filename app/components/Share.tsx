"use client"

import React from "react"
import { useLocale} from "@/locales";
import { useParams } from "next/navigation";
import { motion } from "motion/react";




export function ShareButton({props}: {props: {name: string, link: string, animate?: boolean}}) {
  let { locale } = useParams() as { locale: string }; 
  const translations: any= useLocale();
  return (
    <>
    <motion.button initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: props.animate ? 3.5 : 1}}} onClick={()=>{
      if(navigator.share){
        navigator.share({
          title: props.name,
          url: props.link
        })
      }
    }}>{translations.common.share[locale]}</motion.button>
    </>
  );
}