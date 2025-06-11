"use client"
import { blog_data } from '@/Assets/assets';
import React, { useState } from 'react';
import BlogItem from '../BlogItem/BlogItem';

const BlogList = () => {

    const [menu, setMenu] = useState("All");

    return (
        <div>
            <div className='flex justify-center gap-6 my-10'>
                <button onClick={() => setMenu("All")} className={`hover:cursor-pointer ${menu === 'All' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}`}>All</button>
                <button onClick={() => setMenu("Technology")} className={`hover:cursor-pointer ${menu === 'Technology' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}`} >Technology</button>
                <button onClick={() => setMenu("Startup")} className={`hover:cursor-pointer ${menu === 'Startup' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}`}>Startup</button>
                <button onClick={() => setMenu("Lifestyle")} className={`hover:cursor-pointer ${menu === 'Lifestyle' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}`}>Lifestyle</button>
            </div>
            {/* map div */}
            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {
                    blog_data.filter((item) => menu === "All" ? true : item.category === menu).map((item, idx) => {
                        return <BlogItem key={idx} image={item?.image} category={item?.category} title={item?.title} description={item?.description} id={item?.id} />
                    })
                }
            </div>
        </div>
    );
};

export default BlogList;