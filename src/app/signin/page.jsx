'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async data => {
    try {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        redirectTo: "/"
      });
    } catch (err) {
      toast.error(err.message);
      console.log(err);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm dark:text-gray-200">Email</label>
            <input {...register('email', { required: 'Email required' })} className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white" type="email" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm dark:text-gray-200">Password</label>
            <input {...register('password', { required: 'Password required' })} className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-white" type="password" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Log In</button>
        </form>
        {errorMsg && <p className="mt-4 text-red-500 text-center">{errorMsg}</p>}

        <div className="mt-6 space-y-3">
          <button onClick={() => signIn('github')} className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">Continue with GitHub</button>
          <button onClick={() => signIn('google')} className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Continue with Google</button>
        </div>

        <p className="mt-4 text-center text-sm dark:text-gray-300">
          Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;