"use client"
import SubscriptionTableItem from '@/Components/Admin/SubscriptionTableItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const page = () => {

    const [emails, setEmails] = useState([]);
    const fetchEmails = async () => {
        const res = await axios.get('/api/email');
        return setEmails(res.data.emails)
    };
    useEffect(() => {
        fetchEmails();
    }, []);

    const deleteEmail = (mongoId) => {
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
                const res = await axios.delete('/api/email', {
                    params: {
                        id: mongoId
                    }
                });
                if (res.data.success) {
                    fetchEmails();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Email deleted.",
                        icon: "success"
                    });
                }
                else {
                    return toast.error("Something went wrong! Please try again later.")
                }
            }
        });
    };

    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h2 className='text-3xl font-semibold'>All Subscriptions: {emails.length}</h2>
            <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>

                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                Email Subscription
                            </th>
                            <th scope='col' className='hidden sm:block px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className=' px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            emails.map((item, idx) => {
                                return <SubscriptionTableItem
                                    key={idx} {...item} deleteEmail={deleteEmail} />
                            })
                        }
                    </tbody>

                </table>

            </div>
        </div>
    );
};

export default page;