import Image from 'next/image';
import { ResetPasswordForm } from './reset-password-auth-form';

// TODO
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
              <h1 className="text-2xl font-semibold tracking-tight">
                Reset password
              </h1>
            </div>
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}
