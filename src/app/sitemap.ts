import type { MetadataRoute } from "next";
import { projects } from "@/lib/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kaidevlab.com";
  const staticRoutes = [
    "",
    "/work",
    "/about",
    "/contact",
    "/lab-notes",
    "/learn",
    "/privacy",
    "/terms",
  ];
  const toolRoutes = [
    "/tools/n3-suite",
    "/tools/tango-n3",
    "/tools/dokkai-n3",
    "/tools/bunpou-n3",
    "/tools/fe-study",
    "/tools/library",
  ];
  const projectRoutes = projects.map((project) => `/work/${project.slug}`);
  const noteRoutes = ["/lab-notes/behind-kaidevlab-redesign"];

  return [...staticRoutes, ...toolRoutes, ...projectRoutes, ...noteRoutes].map((route) => ({
    url: `${base}${route}/`,
    changeFrequency: route === "" || route === "/learn" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/learn"
          ? 0.9
          : route.startsWith("/work/")
            ? 0.75
            : route.startsWith("/tools")
              ? 0.7
              : 0.65,
  }));
}
