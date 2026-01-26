import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neuronest | Nội Thất Gỗ Cao Cấp",
  description: "Trải nghiệm không gian sống đẳng cấp với Neuronest - Chuyên cung cấp nội thất gỗ tự nhiên tinh tế và sang trọng.",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
