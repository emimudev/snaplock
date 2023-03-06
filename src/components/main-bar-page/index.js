import { useLayoutContext } from '@/context/layoutContext'
import { useMainPageContext } from '@/context/mainPageContext'
import useUser from '@/hooks/useUser'
import Link from 'next/link'
import { memo } from 'react'
import { RiArrowRightSLine, RiInformationLine } from 'react-icons/ri'
import Button from '../button'

function MainBarPage({ title, actions }) {
  const { toggleItemViewer } = useMainPageContext()
  const { folder } = useLayoutContext()

  const pageTitle = folder ? folder?.name : title
  return (
    <div className="flex h-full max-h-[42px] items-center justify-between border-b px-4 dark:border-white/10">
      <div className="flex flex-1 items-center gap-2 ">
        {<BreadCrumbs folder={folder} />}
        {<h1 className="text-lg font-semibold">{pageTitle}</h1>}
      </div>
      <div className="flex-0 flex  justify-end gap-2">
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

function BreadCrumbs({ folder }) {
  const { user } = useUser()
  if (!folder || !user) return null
  const { id: userId } = user
  const { parentFolders } = folder
  const root = getRoot({ folder, userId })

  return (
    <div className="flex items-center gap-1">
      <BreadCrumbItem path={root.path} name={root.name} />
      <RiArrowRightSLine className="h-4 w-4" />
      {/* {parentFolder && (
        <>
          <BreadCrumbItem
            path={`/folder/${parentFolder.id}`}
            name={parentFolder.name}
          />
          <RiArrowRightSLine className="h-4 w-4" />
        </>
      )} */}
      {parentFolders.lenght !== 0 &&
        parentFolders.map((folder, index) => (
          <>
            <BreadCrumbItem
              path={`/folder/${folder.id}`}
              name={folder.name}
              key={folder.id}
            />
            <RiArrowRightSLine className="h-4 w-4" />
          </>
        ))}
    </div>
  )
}

function BreadCrumbItem({ path, name }) {
  return (
    <Link href={path}>
      <Button as="span" flat rounded className="h-7 max-w-[170px] px-4">
        {name}
      </Button>
    </Link>
  )
}

function getRoot({ folder, userId }) {
  // const isFiles = !folder.isDeleted && userId === folder.owner.id
  const isSomeDeleted = folder.parentFolders.some((f) => f.isDeleted)
  const isShared =
    !folder.isDeleted && !isSomeDeleted && userId !== folder.owner.id
  const isTrash = folder.isDeleted || isSomeDeleted
  if (isShared) {
    return {
      name: 'Shared with me',
      path: '/shared'
    }
  }
  if (isTrash) {
    return {
      name: 'Recycle bin',
      path: '/bin'
    }
  }
  return {
    name: 'My files',
    path: '/files'
  }
}

export default memo(MainBarPage)
