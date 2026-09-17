import type { Track } from "./types";
import { m01Variables } from "./js/m01-variables";
import { m02Functions } from "./js/m02-functions";
import { m03ArrayMethods } from "./js/m03-array-methods";
import { m04Objects } from "./js/m04-objects";
import { m05DomEvents } from "./js/m05-dom-events";
import { m06Async } from "./js/m06-async";
import { m07Modules } from "./js/m07-modules";
import { m08Errors } from "./js/m08-errors";

export const tracks: Track[] = [
  {
    id: "javascript",
    title: "JavaScript",
    subtitle: "The language of the web",
    description:
      "Master JavaScript fundamentals — from variables to async programming. This track covers everything you need to know to build real applications and pass job interviews.",
    icon: "JS",
    status: "active",
    color: "#f7df1e",
    modules: [
      m01Variables,
      m02Functions,
      m03ArrayMethods,
      m04Objects,
      m05DomEvents,
      m06Async,
      m07Modules,
      m08Errors,
    ],
  },
  {
    id: "css",
    title: "CSS",
    subtitle: "Making the web beautiful",
    description:
      "Learn modern CSS — Flexbox, Grid, responsive design, and Tailwind CSS. Coming soon.",
    icon: "CSS",
    status: "coming-soon",
    color: "#1572b6",
    modules: [],
  },
  {
    id: "typescript",
    title: "TypeScript",
    subtitle: "JavaScript with superpowers",
    description:
      "Add type safety to your JavaScript. Learn interfaces, generics, and advanced types. Coming soon.",
    icon: "TS",
    status: "coming-soon",
    color: "#3178c6",
    modules: [],
  },
  {
    id: "english",
    title: "English for Developers",
    subtitle: "Communicate like a professional",
    description:
      "Learn technical English — grammar, vocabulary, and interview preparation for remote jobs. Coming soon.",
    icon: "EN",
    status: "coming-soon",
    color: "#e34f26",
    modules: [],
  },
];

export function getTrackById(id: string): Track | undefined {
  return tracks.find((t) => t.id === id);
}

export function getModuleById(id: string) {
  for (const track of tracks) {
    const module = track.modules.find((m) => m.id === id);
    if (module) return module;
  }
  return undefined;
}

export function getAllModules() {
  return tracks.flatMap((t) => t.modules);
}

export function getTotalLessons() {
  return getAllModules().reduce((sum, m) => sum + m.lessons.length, 0);
}
