import 'ui/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-base-100 text-base-content min-h-screen">
        {children}
      </body>
    </html>
  );
}
