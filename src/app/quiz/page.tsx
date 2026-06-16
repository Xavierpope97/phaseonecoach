import type { Metadata } from "next";
import QuizFunnel from "@/components/quiz/QuizFunnel";

export const metadata: Metadata = {
  title: "Find Your Phase — Phase One Coaching",
  description:
    "Take our 60-second assessment to find out exactly what phase your business is in and what to focus on right now.",
};

export default function QuizPage() {
  return <QuizFunnel />;
}
