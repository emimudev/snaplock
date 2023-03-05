import { useMainPageContext } from '@/context/mainPageContext'
import { memo } from 'react'
import { RiInformationLine } from 'react-icons/ri'
import Button from '../button'

function MainBarPage({ title, actions }) {
  const { toggleItemViewer } = useMainPageContext()
  return (
    <div className="flex h-full max-h-[42px] items-center justify-between border-b px-4 dark:border-white/10">
      <h1 className="text-lg font-semibold">{title}</h1>
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
