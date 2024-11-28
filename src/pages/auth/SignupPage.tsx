import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Gamepad2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-purple-500">
            <Gamepad2 size={32} />
            <span>GameHub</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Create your account</h2>
          <p className="mt-2 text-gray-400">Join the gaming community today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              placeholder="Username"
              {...register('username')}
              error={errors.username?.message}
            />
            <Input
              type="email"
              placeholder="Email address"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              type="password"
              placeholder="Password"
              {...register('password')}
              error={errors.password?.message}
            />
            <Input
              type="password"
              placeholder="Confirm password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <div className="flex items-center justify-center">
              <label className="relative cursor-pointer">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center">
                  <Upload size={24} className="text-gray-500" />
                </div>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('terms')}
              className="rounded border-gray-700 bg-gray-800 text-purple-500 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-300">
              I agree to the{' '}
              <Link to="/terms" className="text-purple-500 hover:text-purple-400">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-purple-500 hover:text-purple-400">
                Privacy Policy
              </Link>
            </span>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-500">{errors.terms.message}</p>
          )}

          <Button type="submit" className="w-full">
            Create account
          </Button>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 hover:text-purple-400">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};