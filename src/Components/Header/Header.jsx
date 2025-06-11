import { assets } from '@/Assets/assets';
import Image from 'next/image';
import React from 'react';

const Header = () => {
    return (
        <div className='py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Image
                    width={180}
                    src={assets.logo}
                    alt='AiBlog logo'
                    className='w-[130px] sm:w-auto'
                />
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Get Started <Image src={assets.arrow} alt='arrow image' /> </button>
            </div>
            <div className='text-center my-8'>
                <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>

            </div>
        </div>
    );
};

export default Header;