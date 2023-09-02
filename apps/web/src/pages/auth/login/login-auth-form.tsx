import * as React from 'react';
import { Loader2, Github } from 'lucide-react';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from 'ui';
import { api } from '@/utils/api';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormValidator } from '@/validators/user';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export function UserAuthForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const register = api.user.register.useMutation();

  const form = useForm<z.infer<typeof loginFormValidator>>({
    resolver: zodResolver(loginFormValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormValidator>) {
    setIsLoading(true);
    signIn('credentials', {});

    setIsLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* { form.formState.errors.} */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field}></Input>
                </FormControl>
                <FormDescription>
                  <Link href="/auth/reset-password" className="link">
                    Forgot password?
                  </Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={'black-white'} className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <div className="relative flex items-center justify-center">
        <span className="px-4 bg-base-100 z-10">Or continue with</span>
        <span className="absolute border-t w-full top-1/2"></span>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{' '}
        Github (disabled)
      </Button>
    </>
  );
}
