import { Button, Link } from "@nextui-org/react";
import {SessionProvider, signOut, useSession} from "next-auth/react";

export default function Navigation({ inbox }: { inbox?: boolean }) {


  return (
    <nav className="h-16 flex items-center place-content-between px-4">
      <h1 className="text-3xl">SillyBox</h1>
      <div className="space-x-3">
        {!inbox && <Button variant="bordered" color="primary" as={Link} href="/inbox">Inbox</Button>}
        <SessionProvider>
          <Logout/>
        </SessionProvider>
      </div>
    </nav>
  );
}

function Logout() {
  const { data: session } = useSession();

  return (
    <>
      {session && <Button variant="bordered" color="danger" onClick={() => signOut()}>Logout</Button>}
    </>
  );
}