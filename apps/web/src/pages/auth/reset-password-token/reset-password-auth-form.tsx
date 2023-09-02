import * as React from 'react';
import { Loader2 } from 'lucide-react';
import {
  Button,
  Form,
  FormControl,
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
import { resetPasswordValidator } from '@/validators/user';

// TODO:
export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const register = api.user.register.useMutation();

  const form = useForm<z.infer<typeof resetPasswordValidator>>({
    resolver: zodResolver(resetPasswordValidator),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordValidator>) {
    setIsLoading(true);
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

          <Button variant={'black-white'} className="w-full" type="submit">
            {isLoading ? <Loader2 className="animate-spin"></Loader2> : 'Reset'}
          </Button>
        </form>
      </Form>
    </>
  );
}
