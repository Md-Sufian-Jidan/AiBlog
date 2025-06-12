"use client"
import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Header = () => {

    const [email, setEmail] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        const res = axios.post('/api/email', formData);

        if (res.data?.success) {
            setEmail('');
            return toast.success(res.data.message);
        }
        else {
            return toast.error("Something went wrong! Try again later.");
        }
    }

    return (
        <div className='py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Image
                    width={180}
                    src={assets.logo}
                    alt='AiBlog logo'
                    className='w-[130px] sm:w-auto'
                />
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:cursor-pointer'>Get Started <Image src={assets.arrow} alt='arrow image' /> </button>
            </div>
            <div className='text-center my-8'>
                <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
                <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis exercitationem veritatis ab officia nisi ipsa autem maiores, hic alias deserunt assumenda voluptatem at error saepe nobis ad cumque qui nesciunt!</p>

                <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]'>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Your Email' className='pl-4 outline-none' />
                    <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white hover:cursor-pointer'>Subscribe</button>
                </form>

            </div>
        </div>
    );
};

export default Header;