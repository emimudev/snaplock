import { ControlledMenu, MenuDivider, MenuItem } from '@szhsin/react-menu'
import { useState } from 'react'

const menuClassName = ({ state }) =>
  `box-border z-50 text-sm bg-white p-1.5 dark:bg-zinc-800 dark:border-white/10 border rounded-md shadow-lg select-none focus:outline-none min-w-[12rem] w-fit ${
    state === 'opening' && 'animate-fadeIn'
  } ${state === 'closing' && 'animate-fadeOut'}`

const menuItemClassName = ({ isDanger }) => {
  return ({ hover, disabled, submenu }) =>
    `rounded-md px-3 py-1 focus:outline-none line-clamp-1 ${
      hover && 'bg-zinc-100 dark:bg-zinc-400/10'
    } ${
      isDanger &&
      'hover:bg-red-50 text-red-500 dark:hover:bg-red-400/10 dark:text-red-300'
    }`
}

export default function ContextMenu({ items, children, onOpen }) {
  const [isOpen, setOpen] = useState(false)
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })

  const handleContextMenu = (e) => {
    e.preventDefault()
    setAnchorPoint({ x: e.clientX, y: e.clientY })
    setOpen(true)
    onOpen && onOpen()
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div candisableitem="false" onContextMenu={handleContextMenu}>
      {children}
      <ControlledMenu
        transition
        anchorPoint={anchorPoint}
        state={isOpen ? 'open' : 'closed'}
        direction="right"
        onClose={handleClose}
        menuClassName={menuClassName}
      >
        {items.map((item) => (
          <>
            {item.divider && (
              <MenuDivider
                key={`divider-${item.id}`}
                className="mx-2.5 my-1.5 h-px bg-gray-200 dark:bg-white/10"
              />
            )}
            <MenuItem
              key={item.id}
              className={menuItemClassName({ isDanger: item.isDanger })}
            >
              <button
                className="flex h-6 w-full items-center gap-2 rounded-md text-left text-xs"
                onClick={item.onClick}
              >
                {item.icon && <span>{item.icon}</span>}
                <span className="line-clamp-1">{item.label}</span>
              </button>
            </MenuItem>
          </>
        ))}
      </ControlledMenu>
    </div>
  )
}
