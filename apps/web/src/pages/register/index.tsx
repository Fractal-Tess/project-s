import { env } from '@/env.mjs';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  if (!env.ENABLE_NEW_USER_REGISTER) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default function Page() {
  return (
    <>
      <h1>Hello from register page</h1>
    </>
  );
}
