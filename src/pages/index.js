import { Button, ToggleTheme } from '@/components'
import { BrandHorizontal } from '@/components/icons'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { BsGithub } from 'react-icons/bs'

export default function Home() {
  return (
    <>
      <Head>
        <title>Snaplock</title>
        <meta
          name="description"
          content="Store files and folders, share and collaborate on them from any mobile device, tablet or computer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="absolute inset-0 z-10 flex flex-col overflow-x-hidden overflow-y-scroll ">
        <div className="flex h-full flex-1 items-center justify-center bg-white dark:bg-zinc-900">
          <div className="flex flex-col">
            <div className="absolute top-0 right-0 left-0 flex h-[70px] w-full items-center justify-between bg-white px-5 dark:bg-zinc-900 md:px-[10%]">
              <div className="w-full max-w-[180px]">
                <BrandHorizontal className="text-slate-600 dark:text-slate-200" />
              </div>
              <div className="flex items-center gap-4">
                <ToggleTheme type="button" />
                <a target="_blank" href="https://github.com/emimudev/snaplock">
                  <Button as="span" flat>
                    <BsGithub className="h-6 w-6" />
                    <span>emimudev</span>
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex flex-col px-8">
              <div className="relative bottom-0 mt-7 max-w-3xl text-4xl font-semibold after:absolute after:h-3 after:w-3 after:bg-red-400 after:shadow-2xl lg:text-6xl">
                Safe and easy access to all your content
              </div>
              <div className="mt-10 max-w-3xl text-lg">
                Snaplock is a cloud storage service that allows you to store
                files and folders, share and collaborate on them from any mobile
                device, tablet or computer.
              </div>
              <div className="mt-7 mb-5">
                <Button size="lg" shadow onClick={() => signIn('google')}>
                  Get started
                </Button>
              </div>
              <div className="my-8 h-2 border-t border-zinc-200" />
              <div className="text-center text-lg ">
                Powered by{' '}
                <span className="font-semibold">
                  Vercel <span className="font-normal"> and </span> Cloudinary
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
