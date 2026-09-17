import { getAllModules } from "@/lib/curriculum/tracks";
import ModuleDetailClient from "./module-detail-client";

export function generateStaticParams() {
  return getAllModules().map((m) => ({
    moduleId: m.id,
  }));
}

export default function ModuleDetailPage({ params }: { params: Promise<{ moduleId: string }> }) {
  return <ModuleDetailClientWrapper params={params} />;
}

import { use } from "react";

function ModuleDetailClientWrapper({ params }: { params: Promise<{ moduleId: string }> }) {
  const resolved = use(params);
  return <ModuleDetailClient moduleId={resolved.moduleId} />;
}
