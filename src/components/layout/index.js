import Navbar from '../navbar'

export default function Layout({ children, user }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden dark:bg-[#18181b]">
      <div className="flex-0 hidden overflow-auto dark:bg-[#18181b] md:flex md:min-w-[256px] ">
        sidebar
      </div>
      <div className="flex flex-auto flex-col overflow-hidden bg-white">
        <div className="h-14 min-h-[56px] ">
          <Navbar user={user} />
        </div>
        <div className="flex min-h-full overflow-hidden">
          <main className="flex flex-auto ">{children}</main>
          <div className="flex-0 hidden min-w-[270px] lg:flex ">
            Item viewer
          </div>
        </div>
      </div>
    </div>
  )
}
