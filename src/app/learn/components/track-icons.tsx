// Real SVG logos for learning tracks — no emoji, no fake "JS" text badges

export function TrackIcon({ trackId, size = 28 }: { trackId: string; size?: number }) {
  switch (trackId) {
    case "javascript":
      // Official JavaScript logo — yellow square with "JS"
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="3" fill="#f7df1e" />
          <path d="M7.5 18.5v-7H5.8v7H7.5zm.9-7v7h1.7v-3.9c0-1.6.9-2.2 1.8-2.2.8 0 1.4.5 1.4 1.6v4.5h1.7v-4.8c0-2.1-1.2-3-2.7-3-1 0-1.7.4-2.2 1.1V11.5H8.4z" fill="#000" />
          <path d="M15.2 18.5v-7h1.7v7h-1.7zm.9-7v7h1.7v-3.9c0-1.6.9-2.2 1.8-2.2.8 0 1.4.5 1.4 1.6v4.5h1.7v-4.8c0-2.1-1.2-3-2.7-3-1 0-1.7.4-2.2 1.1V11.5h-1.7z" fill="#000" />
        </svg>
      );
    case "css":
      // CSS3 logo
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2l1.5 17L12 21l7.5-2L21 2H3z" fill="#1572b6" />
          <path d="M18 5.5l-.5 5.5H8l.3 3h9l-.6 6L12 21l-4.7-1.5L7 14h2.2l.1 1.5 2.7.8 2.7-.8.3-3.2H7.1L6.7 8h10.8l.3-2.5H6.4L6 2.5H18z" fill="#fff" />
        </svg>
      );
    case "typescript":
      // TypeScript logo — blue square with "TS"
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="3" fill="#3178c6" />
          <path d="M6 12.5h5.3v1.4H7.7v1.2h3.3v1.4H7.7v1.4H11v1.5H6v-6.9zm5.8 1.4v-1.5h5.8v1.5h-2v5.5h-1.7v-5.5h-2.1z" fill="#fff" />
        </svg>
      );
    case "english":
      // English — speech bubble with "EN"
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4h18v12H8l-5 4V4z" fill="#e34f26" />
          <text x="12" y="12.5" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="Arial">EN</text>
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="3" fill="currentColor" />
        </svg>
      );
  }
}

export function BadgeIcon({ badgeId, size = 20 }: { badgeId: string; size?: number }) {
  const icons: Record<string, string> = {
    "first-step": "01",
    "js-basics": "02",
    "js-master": "03",
    "quiz-master": "04",
    "streak-7": "07",
    "streak-30": "30",
    "daily-challenger": "05",
    "lab-notes-writer": "06",
    "lesson-explorer": "08",
    "halfway-there": "09",
  };
  const label = icons[badgeId] || "--";
  return (
    <span className="badge-num" style={{ fontSize: `${size * 0.4}px` }}>{label}</span>
  );
}
