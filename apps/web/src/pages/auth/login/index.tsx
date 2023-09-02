import { env } from '@/env.mjs';
import Image from 'next/image';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { UserAuthForm } from './login-auth-form';

// TODO
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
      <div className="h-screen flex justify-center items-center [&>*]:h-full [&>*]:flex-1 bg-base-300 heropattern-topography-white/10 ">
        <div className="hidden md:form-control shadow-[5px_0_15px_rgba(0,0,0,0.3)] items-center justify-center p-4  z-[50]">
          <div className=" gap-y-8 font-bold text-4xl form-control items-center justify-center text-white  ">
            <Image
              src="/logo.png"
              width={96}
              height={96}
              alt="logo"
              className="rounded-full"
            />
            Project-S
          </div>
        </div>
        <div className="bg-base-100 form-control justify-center items-center">
          <div className="form-control justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to login
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
