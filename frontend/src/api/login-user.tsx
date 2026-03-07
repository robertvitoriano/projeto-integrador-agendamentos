export async function loginUser(credentials: { email: string; password: string }) {
  const response = await fetch('http://localhost:3000/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) throw new Error('Login failed') // important for TanStack to catch errors

  return response.json()
}
