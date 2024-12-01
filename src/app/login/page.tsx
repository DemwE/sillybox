'use client';

import {Input, Button} from "@nextui-org/react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData.entries());

    const res = await signIn("credentials", {
      redirect: false,
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      imapHost: credentials.imapHost,
      imapPort: credentials.imapPort,
      smtpHost: credentials.smtpHost,
      smtpPort: credentials.smtpPort,
    });

    if (res && !res.error) {
      alert("Dane zostały zapisane w sesji!");
    } else {
      alert("Błąd: " + (res ? res.error : "Unknown error"));
    }
  }



  return (
    <form className="h-dvh flex justify-center items-center" onSubmit={handleSubmit}>
      <div className="grid w-96 gap-6">
        <div className="border-3 border-gray-300 p-4 rounded-xl space-y-4 bg-gray-600">
          <h2 className="text-xl">Credentials</h2>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input name="name" type="text" label="Name"/>
          </div>
          <Input name="email" type="email" label="Email" required/>
          <Input name="password" type="password" label="Password" required/>
        </div>
        <div className="border-3 border-gray-300 p-4 rounded-xl space-y-4 bg-gray-600">
          <h2 className="text-xl">IMAP</h2>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input name="imapHost" type="text" label="Hostname" required/>
            <Input name="imapPort" type="number" label="Port" defaultValue={"143"} required/>
          </div>
        </div>
        <div className="border-3 border-gray-300 p-4 rounded-xl space-y-4 bg-gray-600">
          <h2 className="text-xl">SMTP</h2>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input name="smtpHost" type="text" label="Hostname" required/>
            <Input name="smtpPort" type="number" label="Port" defaultValue={"587"} required/>
          </div>
        </div>
        <Button type={"submit"}>Sign in</Button>
      </div>
    </form>
  );
}