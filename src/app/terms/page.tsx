import type { Metadata } from "next";
import { TermsClient } from "./terms-client";

export const metadata: Metadata = {
  title: "Terms of Service — Kaidevlab",
  description:
    "Kaidevlab terms of service — rules and guidelines for using kaidevlab.com.",
};

export default function Terms() {
  return <TermsClient />;
}
