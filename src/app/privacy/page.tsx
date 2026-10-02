import type { Metadata } from "next";
import { PrivacyClient } from "./privacy-client";

export const metadata: Metadata = {
  title: "Privacy Policy — Kaidevlab",
  description:
    "Kaidevlab privacy policy — how data is collected, used, and protected on kaidevlab.com.",
  alternates: { canonical: "/privacy/" },
};

export default function Privacy() {
  return <PrivacyClient />;
}
