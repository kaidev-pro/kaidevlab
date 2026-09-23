import type { Metadata } from "next";
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact — Kaidevlab",
  description:
    "Get in touch with Kai for product building, AI systems, creative technology, visual storytelling, or collaboration at Kaidevlab.",
};

export default function Contact() {
  return <ContactClient />;
}
