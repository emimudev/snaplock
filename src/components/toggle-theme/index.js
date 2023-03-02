import { useTheme } from '@/context/theme-context'
import { MdCheck, MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import Button from '../button'

export default function ToggleTheme({ type = 'switch', offElement = null }) {
  const { theme, toggleTheme } = useTheme()

  const indicatorPosition = theme === 'light' ? 'left-1' : 'left-8'

  console.log('here')
  if (type === 'switch') {
    return (
      <label
        onClick={(evt) => {
          evt.preventDefault()
          evt.stopPropagation()
          toggleTheme()
        }}
        className="group relative flex w-max cursor-pointer select-none items-center"
      >
        <input
          onChange={() => {}}
          checked={theme === 'dark'}
          type="checkbox"
          className="h-7 w-14 cursor-pointer appearance-none rounded-full border-2 transition-colors checked:border-emerald-600 checked:ring-green-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-inherit focus-visible:ring-2 group-hover:border-emerald-300"
        />
        <span className="absolute right-1 text-xs font-medium uppercase">
          {offElement}
        </span>
        <span className="absolute right-8 text-xs font-medium uppercase">
          <MdCheck
            className={`h-4 w-4 ${theme === 'dark' && 'text-emerald-300'}`}
          />
        </span>
        <span
          className={`absolute left-0 h-5 w-5 transform rounded-full group-hover:bg-emerald-300 ${
            theme === 'dark' ? 'bg-emerald-300' : 'bg-zinc-300'
          } p-1 transition-all ${indicatorPosition} `}
        />
      </label>
    )
  }

  return (
    <Button onClick={toggleTheme} onlyIcon ghost rounded>
      {!theme ? (
        ''
      ) : theme === 'light' ? (
        <MdOutlineDarkMode className="h-5 w-5" />
      ) : (
        <MdOutlineLightMode className="h-5 w-5" />
      )}
    </Button>
  )
}
