import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { db, user } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { string } from 'zod';
import Link from 'next/link';
import { buttonVariants } from 'ui';

type ActivationResult = {
  success: boolean;
};

export default function Page({
  success,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="h-screen form-control items-center justify-center">
      <div className="dev px-8 py-4 form-control items-center justify-center gap-y-8 ">
        {success ? (
          <>
            <h1 className="font-bold text-2xl">
              Account activation successful
            </h1>
            <Link className={buttonVariants({})} href="/">
              Go home home
            </Link>
          </>
        ) : (
          <>
            <h1 className="font-bold text-2xl">Account activation error</h1>
            <p>Activation token was not found in database</p>
            <Link className={buttonVariants({})} href="/">
              Go home home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ActivationResult> = async (
  ctx
) => {
  const token = string().parse(ctx.params?.token);

  const result = await db.query.user.findFirst({
    where: eq(user.emailConfirmationToken, token),
  });

  if (!result) {
    return {
      props: {
        success: false,
      },
    };
  }

  await db.update(user).set({
    emailConfirmationToken: '',
    emailConfirmed: true,
  });

  return {
    props: {
      success: true,
    },
  };
};
