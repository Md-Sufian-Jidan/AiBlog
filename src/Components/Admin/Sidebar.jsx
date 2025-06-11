import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <div className='flex flex-col bg-slate-100'>
            <div className='px-2 sm:pl-14 py-3 border border-black'>
                <Image src={assets.logo} alt='logo' width={120} />
            </div>
            <div className='w-36 sm:w-80 h-[100vh] relative py-12 border border-black'>
                <div className='w-[100%] sm:w-[80%] absolute right-0'>
                    <Link href={'/admin/addBlog'} className='flex items-center border border-black gap-1 font-medium px-3 py-2 bg-white shadow-[-7px_7px_0px_#000]'>
                        <Image src={assets.add_icon} width={36} alt='add icon' />
                        <p>Add Blog</p>
                    </Link>
                    <Link href={'/admin/blogList'} className='flex items-center border border-black gap-1 font-medium px-3 py-2 bg-white shadow-[-7px_7px_0px_#000] mt-5'>
                        <Image src={assets.blog_icon} width={36} alt='add icon' />
                        <p>Blog Lists</p>
                    </Link>
                    <Link href={'/admin/subscriptions'} className='flex items-center border border-black gap-1 font-medium px-3 py-2 bg-white shadow-[-7px_7px_0px_#000] mt-5'>
                        <Image src={assets.email_icon} width={36} alt='add icon' />
                        <p>Subscriptions</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;