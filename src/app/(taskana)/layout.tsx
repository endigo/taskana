export default function TaskanaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="min-h-screen px-40 py-10">{children}</main>;
}
