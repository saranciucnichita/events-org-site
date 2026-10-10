// app/actions.ts
'use server'

export async function registerUser(formData: any) {
  try {
    const response = await fetch('http://localhost:4000/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return { success: true };
    }
    console.error('Server error response:', response.status);
    return { success: false, error: 'Unspecified error occurred' };
  } catch (error) {
    console.error('Network error on server:', error);
    return { success: false, error: 'Network error' };
  }
}
