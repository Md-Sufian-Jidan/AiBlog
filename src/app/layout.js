import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

const outfit = Outfit({ subsets: ['latin'], weight: ["400", "500", "600", "700"] })

export const metadata = {
  title: "GiniBlog",
  description: "Ai Blog app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
