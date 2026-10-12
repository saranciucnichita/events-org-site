// app/dashboard/page.tsx (Next.js Server Component)
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getUserProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/register');
  }

  const response = await fetch('http://localhost:4000/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 0 }
  });

  if (!response.ok) {
    redirect('/login');
  }

  return response.json();
}

export default async function DashboardPage() {
  const user = await getUserProfile();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bun venit în panoul de control, {user.username}!</h1>
      <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
        <h3>Informațiile tale:</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role || '-'}</p>
      </div>
    </div>
  );
}
