export type StudyGroup = "n3" | "fe" | "tools";
export interface StudyRoute { href: string; label: string; group: StudyGroup }
export const STUDY_TOOL_ROUTES: StudyRoute[] = [
  { href: "/tools/n3-suite/", label: "N3 Suite", group: "n3" },
  { href: "/tools/tango-n3/", label: "N3 Tango", group: "n3" },
  { href: "/tools/bunpou-n3/", label: "N3 Bunpou", group: "n3" },
  { href: "/tools/dokkai-n3/", label: "N3 Dokkai", group: "n3" },
  { href: "/tools/fe-study/", label: "FE Study", group: "fe" },
  { href: "/tools/library/", label: "Library", group: "tools" },
];
export function getStudyRoute(pathname: string): StudyRoute | null {
  const normalized = `${pathname.replace(/\/+$/, "")}/`;
  return STUDY_TOOL_ROUTES.find(route => route.href === normalized) || null;
}
