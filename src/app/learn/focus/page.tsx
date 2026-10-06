import type { Metadata } from "next";
import { StudyFocusClient } from "@/components/academy/study-focus-client";
export const metadata:Metadata={title:"Mode Fokus — Kaidevlab Study",description:"Satu tugas, fokus penuh. Belajar dalam sesi kecil dan lanjut dari posisi terakhir.",robots:{index:false,follow:false}};
export default function FocusPage(){return <StudyFocusClient/>;}
