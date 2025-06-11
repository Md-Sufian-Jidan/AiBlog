"use client"
import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddBlogPage = () => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Jhon doe",
        authorImg: "/authorImg.png"
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
        console.log(data);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);
        formData.append('image', image);

        const res = await axios.post('/api/blog', formData);

        if (res.data.success === true) {
            setImage(false);
            setData({
                title: "",
                description: "",
                category: "Startup",
                author: "Jhon doe",
                authorImg: "/authorImg.png"
            })
            return toast.success(res.data.message);
        }
        else {
            return toast.error('Something went wrong! Please try again later.');
        }

    };

    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-6 sm:pl-16'>
                {/* image input */}
                <p className='text-xl'>Upload thumbnail</p>
                <label htmlFor="image">
                    <Image className='mt-2 hover:cursor-pointer' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt='' />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                {/* blog title input */}
                <p className='text-xl mt-2'>Blog title</p>
                <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-2 px-4 py-3 border' type='text' placeholder='Type here' required />
                {/* blog description input */}
                <p className='text-xl mt-2'>Blog description</p>
                <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-2 px-4 py-3 border' type='text' placeholder='Write content here' rows={5} required />
                {/* Blog category */}
                <p className='text-xl mt-2'>Blog Category</p>
                <select name='category' onChange={onChangeHandler} className='w-full sm:w-[500px] mt-2 px-4 py-3 border text-gray-500'>
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                <br />
                {/* add button */}
                <button type='submit' className='my-4 w-40 h-12 bg-black text-white hover:cursor-pointer'>Add</button>
            </form>
        </>
    );
};

export default AddBlogPage;