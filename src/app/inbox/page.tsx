'use client';

import { SessionProvider, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";
import Navigation from "@/components/navigation";
import Loading from "@/components/loading/loading";

export default function Inbox() {
  return (
    <SessionProvider>
      <InboxContent />
    </SessionProvider>
  );
}

function InboxContent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loading/>;

  if (!session) {
  window.location.href = "/login";
  return null;
}

  const user = session?.userData;

  return (
    <>
      <Navigation inbox />
      <div>
        <h1>Witaj {session?.user?.name}</h1>
        <p>Twoje dane IMAP: {user?.imapHost}:{user?.imapPort}</p>
        <p>Twoje dane SMTP: {user?.smtpHost}:{user?.smtpPort}</p>
        <Button onClick={() => signOut()}>Login</Button>
        <p>{JSON.stringify(session)}</p>
      </div>
    </>
  );
}