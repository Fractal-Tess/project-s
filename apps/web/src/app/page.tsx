import { getServerAuthSession } from '~/auth/auth';
import { signIn } from 'next-auth/react';

export default async function Page() {
  const session = await getServerAuthSession();

  return <></>;
}
