import type { PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';
import TrpcProvider from './TrpcProvider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <TrpcProvider>{children}</TrpcProvider>
    </AuthProvider>
  );
}
