import Image from "next/image";
import loading from "./loading.svg";

export default function Loading() {
  return (
    <main className="w-dvw h-dvh flex justify-center items-center">
      <div>
        <Image src={loading} alt="Loading"/>
      </div>
    </main>
  );
}