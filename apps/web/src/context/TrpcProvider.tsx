'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from '~/trpc/client';

export default function TrpcProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({});
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: process.env.PUBLIC_NEXT_ORIGIN + '/api/trpc',
      }),
    ],
  });
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
