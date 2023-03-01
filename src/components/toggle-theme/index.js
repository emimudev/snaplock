import { useTheme } from '@/context/theme-context'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import Button from '../button'

export default function ToggleTheme() {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button onClick={toggleTheme} ghost rounded>
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
