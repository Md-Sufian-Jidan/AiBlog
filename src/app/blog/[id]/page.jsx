"use client"
import { assets, blog_data } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BlogPage = () => {
    const params = useParams();
    const id = params?.id;
    const [data, setData] = useState(null);

    const fetchedData = async () => {
        const res = await axios.get(`/api/blog/`, {
            params: {
                id
            }
        });
        setData(res.data);
    };

    useEffect(() => {
        fetchedData()
    }, []);

    if (!data) {
        return <p className="text-center my-24 text-red-50">Something Went Wrong!</p>;
    }

    return (
        <>
            <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
                <div className="flex justify-between items-center">
                    <Link href={'/'}>
                        <Image src={assets.logo} width={100} alt="" className="w-[130px] sm:w-auto" />
                    </Link>
                    <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000] hover:cursor-pointer">Get Started <Image src={assets.arrow} alt='arrow image' /></button>

                </div>
                {/* authorImg & name */}
                <div className="text-center my-24">
                    <h1 className="text-2xl sm:text-xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
                    <Image className="mx-auto mt-6 border border-white rounded-full" src={data.authorImg} alt="Author Image" width={60} height={60} />
                    <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>

                </div>
            </div>
            {/* main content */}
            <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
                <Image className="border-4 border-white" src={data.image} alt="Blog Image" width={1280} height={720} />

                <div className="blog-content" dangerouslySetInnerHTML={{ __html: data.description }}>

                </div>


                <div className="my-24">
                    <p className="text-black font-semibold my-4">Share this article on social media</p>
                    <div className="flex">
                        <Image src={assets.facebook_icon} width={50} alt="Facebook icon" />
                        <Image src={assets.twitter_icon} width={50} alt="Twitter icon" />
                        <Image src={assets.googleplus_icon} width={50} alt="Google icon" />
                    </div>
                </div>
            </div>
        </>

    );
};

export default BlogPage;