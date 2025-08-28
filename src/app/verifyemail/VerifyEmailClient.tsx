'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';

export default function VerifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('error');
            setMessage('No verification token found in the URL.');
            return;
        }

        // Actual verification
        const verifyEmail = async () => {
            try {
                const res = await axios.post('/api/verifyemail', { token });
                setStatus('success');
                setMessage(res.data.message || 'Email verified successfully!');

                // Auto-redirect after success
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } catch (error) {
                let errorMsg = 'Verification failed. Link may be invalid or expired.';
                if (axios.isAxiosError(error) && error.response?.data?.message) {
                    errorMsg = error.response.data.message;
                }
                setStatus('error');
                setMessage(errorMsg);
                console.error('Verification error:', error);
            }
        };

        verifyEmail();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg text-center">
                {/* Icon */}
                <div className="flex justify-center text-6xl">
                    {status === 'loading' && <FaEnvelope className="text-blue-500" />}
                    {status === 'success' && <FaCheckCircle className="text-green-500" />}
                    {status === 'error' && <FaTimesCircle className="text-red-500" />}
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {status === 'loading'
                        ? 'Verifying...'
                        : status === 'success'
                            ? 'Verified Successfully!'
                            : 'Verification Failed'}
                </h1>

                {/* Message */}
                <p className="mt-4 text-gray-600 dark:text-gray-300">{message}</p>

                {/* Spinner */}
                {status === 'loading' && (
                    <div className="flex justify-center my-4">
                        <div className="w-8 h-8 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Back to Login */}
                <div className="mt-6">
                    <Link href="/login" className="text-blue-600 hover:underline text-sm font-medium">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}