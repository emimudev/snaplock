import { useMainPageContext } from '@/context/mainPageContext'
import Link from 'next/link'
import { memo } from 'react'
import { RiArrowLeftLine, RiInformationLine } from 'react-icons/ri'
import Button from '../button'

function MainBarPage({ rootDir = '/', title, actions }) {
  const { toggleItemViewer } = useMainPageContext()
  return (
    <div className="flex h-full max-h-[42px] items-center justify-between border-b px-4 dark:border-white/10">
      <div className="flex items-center gap-2">
        <Link href={rootDir}>
          <Button as="span" ghost rounded onlyIcon size="sm">
            <RiArrowLeftLine className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex-0 flex gap-2">
        <div className="flex items-center">{actions}</div>
        <div className="flex items-center">
          <Button onClick={toggleItemViewer} ghost rounded onlyIcon size="sm">
            <RiInformationLine className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(MainBarPage)
