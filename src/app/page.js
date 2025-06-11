import BlogList from "@/Components/BlogList/BlogList";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Header />
    <BlogList />
    <Footer />
    </>
  );
}
