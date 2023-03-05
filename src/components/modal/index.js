import { Dialog } from '@headlessui/react'
import { tv } from 'tailwind-variants'

const modalStyles = tv({
  base: 'z-40 bg-white dark:bg-zinc-800 rounded-2xl w-full min-h-fit flex flex-col shadow-lg',
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl'
    }
  }
})

export default function Modal({ isOpen, children, size = 'lg', onClose }) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div
        className="fixed inset-0 z-30 bg-zinc-900 opacity-40 backdrop-blur-[2px]  dark:opacity-80 "
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-30 flex items-center justify-center overflow-y-auto p-4">
        <Dialog.Panel className={modalStyles({ size })}>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

Modal.Title = function SimpleModalTitle({ children, showBorder = false }) {
  return (
    <div
      className={`border-gray-200 px-5 pt-4 dark:border-zinc-600 ${
        showBorder && 'border-b '
      }`}
    >
      <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-neutral-100">
        {children}
      </h3>
    </div>
  )
}

Modal.Body = function SimpleModalBody({ children }) {
  return <div className="px-5 py-4">{children}</div>
}

Modal.Footer = function SimpleModalFooter({ children, showBorder = false }) {
  return (
    <div
      className={`flex flex-1 items-end border-gray-200 px-4 py-3 dark:border-zinc-600 ${
        showBorder && 'border-t'
      }`}
    >
      {children}
    </div>
  )
}
