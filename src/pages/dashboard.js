import { signOut } from 'next-auth/react'

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <h1>Dashboard</h1>
      <a
        href={'/api/auth/signout'}
        className="rounded bg-blue-500 p-2 text-white"
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
      >
        Sign out
      </a>
    </div>
  )
}
