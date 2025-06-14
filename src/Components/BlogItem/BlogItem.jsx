import { assets, blog_data } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';

const BlogItem = ({ image, category, title, description, _id }) => {
    return (
        <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]'>
            <Link href={`/blog/${_id}`}>
                <Image src={image} alt='blog Image' width={400} height={400} className='border border-black' />
                <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
                <div className='p-5'>
                    <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
                    <p className='mb-3 text-sm tracking-tight text-gray-700'
                        dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}></p>
                    <div className='flex items-center py-2 font-semibold text-center'>
                        Read More <Image src={assets.arrow} alt='arrow' width={12} className='ml-2' />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BlogItem;