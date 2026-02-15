"use client"
import { checkBrowser } from "@/locales/checkBrowser";
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/"+checkBrowser()+"/");
}