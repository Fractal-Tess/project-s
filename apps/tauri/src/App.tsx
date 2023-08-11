import {
  Avatar,
  AvatarImage,
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
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { greetFromRust } from './ipc';
import { useState } from 'react';

const FormSchema = z.object({
  message: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

function App() {
  const [response, setResponse] = useState<string>('');
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await greetFromRust(data.message);
    setResponse(res);
  }
  return (
    <>
      {/* Header */}
      <main className="form-control justify-center flex-1 items-center">
        {/* <Input type="text" placeholder="Pass IPC message" /> */}
        <Avatar>
          <AvatarImage src="/logo.png" className="w-14 h-14" />
        </Avatar>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/3 space-y-6 justify-center"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IPC Message pass</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This string will be passed through the IPC to the rust/tauri
                    backend and returned back to js-land
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={'black-white'} type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        <p className="mt-8 min-h-6">{response}</p>
      </main>
      {/* Footer */}
    </>
  );
}

export default App;
