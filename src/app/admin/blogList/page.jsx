"use client";
import BlogTableItem from '@/Components/Admin/BlogTableItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const BlogListPage = () => {

    const [blogs, setBlogs] = useState([]);
    const fetchBlogs = async () => {
        const res = await axios.get('/api/blog');
        setBlogs(res.data.blogs);
    };

    const deleteBlog = async (mongoId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete('/api/blog', {
                    params: {
                        id: mongoId
                    }
                });
                if (res.data.success) {

                    fetchBlogs();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Blog has been deleted.",
                        icon: "success"
                    });
                }
            }
        });

    };

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1 className='text-3xl font-semibold'>All Blogs: {blogs?.length}</h1>
            <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='hidden sm:block px-6 py-3'>
                                Author Name
                            </th>
                            <th scope='col' className=' px-6 py-3'>
                                Blog Title
                            </th>
                            <th scope='col' className=' px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className=' px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogs.map((blog, idx) => {
                                return <BlogTableItem key={idx} {...blog} deleteBlog={deleteBlog} />
                            })
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default BlogListPage;