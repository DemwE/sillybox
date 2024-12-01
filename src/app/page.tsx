'use client';
import {Button} from "@nextui-org/react";
import Navigation from "@/components/navigation";

export default function Home() {
  return (
    <>
      <Navigation/>
      <div className="">
        Home page
        <Button>Click me</Button>
      </div>
    </>
  );
}
