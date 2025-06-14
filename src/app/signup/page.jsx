"use client"
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import UserModel from '@/lib/models/UserModel';
import { hash } from "bcryptjs"
import { redirect } from 'next/dist/server/api-utils';
import { ConnectDB } from '@/lib/config/db';

export default function Signup() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    const name = data.name;
    const email = data.email;
    const password = data.password;

    if (!name || !email || !password) {
      throw new Error('Please provide all fields');
    }
    // connection with database here
    await ConnectDB();

    const user = await UserModel.findOne({ email });

    if (user) {
      throw new Error('User already existed');
    }
    const hashedPassword = await hash(password, 10);

    // create new user
    UserModel.create({
      name,
      email,
      password: hashedPassword
    });

    redirect('/login')
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
              type="text"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
              type="email"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">Password</label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Min length is 6 characters' },
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
              type="password"
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}
