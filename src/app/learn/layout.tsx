import "./learn.css";
import type { ReactNode } from "react";

export default function LearnLayout({ children }: { children: ReactNode }) {
  return (
    <div className="learn-layout">
      <div className="learn-container">{children}</div>
    </div>
  );
}
