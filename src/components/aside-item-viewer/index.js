import { useMainPageContext } from '@/context/mainPageContext'

export default function AsideItemViewer() {
  const { isItemViewerVisible } = useMainPageContext()
  return (
    <div
      className={`layout-aside-item-viewer can-disable-folder flex-0 hidden transform-gpu overflow-x-hidden border-l bg-zinc-100 transition-[min-width,width] dark:border-white/10 dark:bg-zinc-900 md:block ${
        !isItemViewerVisible ? 'w-0 min-w-0' : 'min-w-[270px]'
      }`}
    >
      <div className="px-4 py-6">item viewer</div>
    </div>
  )
}
