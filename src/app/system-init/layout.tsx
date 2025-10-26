import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Initialization | NexusHub",
  description:
    "Initialize your operator profile and configure your command deck",
};

export default function SystemInitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="dark bg-background min-h-screen">{children}</div>;
}
