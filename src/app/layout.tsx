import "./globals.css";

export const metadata = {
  title: "Warung Sembako Online",
  description: "Aplikasi e-commerce warung sembako",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
