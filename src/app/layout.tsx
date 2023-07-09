import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import getCurrentUser from "@/actions/getCurrents";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TixMov - Buy tickets for your favorite movies",
  description: "Buy tickets for your favorite movies in a few clicks",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = (await getCurrentUser()) as any;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Navbar currentUser={currentUser} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
