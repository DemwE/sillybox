'use client';

import { SessionProvider, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

export default function Inbox() {
  return (
    <SessionProvider>
      <InboxContent />
    </SessionProvider>
  );
}

function InboxContent() {
  const { data: session } = useSession();

  if (!session) return <p>Ładowanie...</p>;

  const user = session?.userData;

  return (
    <div>
      <h1>Witaj {session?.user?.name}</h1>
      <p>Twoje dane IMAP: {user?.imapHost}:{user?.imapPort}</p>
      <p>Twoje dane SMTP: {user?.smtpHost}:{user?.smtpPort}</p>
      <Button onClick={() => signOut()}>Logout</Button>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}