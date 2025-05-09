/**
 * Layout component for authentication pages
 * Provides a clean layout without sidebar and navbar
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex items-center justify-center bg-background">
      {children}
    </div>
  );
} 