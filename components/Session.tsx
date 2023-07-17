import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session } = useSession();
  console.log('session', session);

  if (!session) {
    return (
      <div>
        <button onClick={() => signIn("github")}>Github Login</button>
        <p>Please sign in to access this page.</p>
      </div>
    )
  }

  return <div><p>Hey {session.user?.name}!</p><button onClick={() => signOut()}>signOut</button></div>;
}
