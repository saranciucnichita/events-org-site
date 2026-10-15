'use server'
import { cookies } from 'next/headers';

interface registerProps {
  username: string;
  email: string;
  role: string;
  password: string;
}

export async function registerUser(formData: registerProps) {
  try {
    const response = await fetch('http://localhost:4000/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      const cookieStore = await cookies();
      cookieStore.set('auth_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60*60, // 1 hour
        path: '/',
      });

      return { success: true };
    }
    const err = await response.json();
    console.error('Server error response:', response.status);
    return { success: false, error: err };

  } catch (error) {
    console.error('Network error on server:', error);
    return { success: false, error: error };
  }
}
