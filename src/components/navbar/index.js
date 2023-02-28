import Avatar from '../avatar'
import { BrandHorizontal } from '../icons'

export default function Navbar({ user }) {
  return (
    <div className="relative flex h-full items-center justify-between gap-4 overflow-hidden px-3 lg:px-6">
      <div className="w-[160px]">
        <BrandHorizontal />
      </div>
      <div>
        {user && (
          <div>
            <Avatar src={user?.image} alt={user?.name} />
          </div>
        )}
      </div>
    </div>
  )
}
