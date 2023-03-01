import { ImSpinner } from 'react-icons/im'
import { tv } from 'tailwind-variants'

export default function Button({
  children,
  className,
  size,
  color,
  bordered = false,
  rounded,
  type,
  flat,
  ghost,
  shadow,
  isLoading,
  ...props
}) {
  return (
    <button
      {...props}
      className={buttonStyles({
        class: className,
        size,
        color,
        bordered,
        rounded,
        type,
        ghost,
        flat,
        shadow,
        isLoading
      })}
    >
      {isLoading && <ImSpinner className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}

const buttonStyles = tv({
  base: 'relative gap-2 flex overflow-hidden items-center justify-center rounded-md font-medium focus:outline-none active:scale-[0.97] transition-transform focus-visible:ring hover:transition-colors',
  variants: {
    color: {
      primary:
        'bg-zinc-900 hover:bg-zinc-700 text-white dark:bg-zinc-600 dark:hover:bg-zinc-700',
      secondary:
        'bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-600 dark:hover:bg-sky-700',
      success:
        'bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700',
      warning:
        'bg-amber-500 hover:bg-amber-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700',
      danger:
        'bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700'
    },
    size: {
      xs: 'px-1.5 h-6 text-xs min-w-[5rem] rounded-[7px]',
      sm: 'px-2.5 h-8 text-sm min-w-[9rem] rounded-[9px]',
      md: 'px-3.5 h-10 text-sm min-w-[12rem] rounded-[12px]',
      lg: 'px-5 h-12 text-md min-w-[14rem] rounded-[14px]',
      xl: 'px-6 h-14 text-lg min-w-[16rem] rounded-[18px]',
      auto: 'px-5 h-10 text-sm min-w-fit rounded-[12px]'
    },
    rounded: {
      true: 'rounded-full'
    },
    bordered: {
      true: 'border-2 bg-transparent dark:bg-transparent'
    },
    flat: {
      true: ''
    },
    ghost: {
      true: 'bg-transparent dark:bg-transparent'
    },
    shadow: {
      true: ''
    },
    isLoading: {
      true: 'pointer-events-none'
    }
  },
  compoundVariants: [
    // Bordered compound variants
    {
      color: 'primary',
      bordered: true,
      className:
        'text-zinc-900 border-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800'
    },
    {
      color: 'secondary',
      bordered: true,
      className:
        'text-sky-500 border-sky-500 hover:bg-sky-100 dark:border-sky-600 dark:text-sky-300 dark:hover:bg-sky-900/30'
    },
    {
      color: 'success',
      bordered: true,
      className:
        'text-emerald-500 border-emerald-500 hover:bg-emerald-100 dark:border-emerald-600 dark:text-emerald-300 dark:hover:bg-emerald-900/30'
    },
    {
      color: 'warning',
      bordered: true,
      className:
        'text-amber-500 border-amber-500 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900/30'
    },
    {
      color: 'danger',
      bordered: true,
      className:
        'text-red-500 border-red-500 hover:bg-red-100 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/30'
    },
    // Shadow compound variants
    {
      color: 'primary',
      shadow: true,
      className: 'shadow-[0_4px_14px_0_#888aa3]'
    },
    {
      color: 'secondary',
      shadow: true,
      className: 'shadow-[0_4px_14px_0_#5EA2EF]'
    },
    {
      color: 'success',
      shadow: true,
      className: 'shadow-[0_4px_14px_0_#88f1b6]'
    },
    {
      color: 'danger',
      shadow: true,
      className: 'shadow-[0_4px_14px_0_#F881AB]'
    },
    {
      color: 'warning',
      shadow: true,
      className: 'shadow-[0_4px_14px_0_#F9CB80]'
    },
    // Flat compound variants
    {
      color: 'primary',
      flat: true,
      className:
        'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10'
    },
    {
      color: 'secondary',
      flat: true,
      className:
        'bg-sky-100 text-sky-600 hover:bg-sky-200 dark:bg-sky-900/50 dark:hover:bg-sky-800/50 dark:text-sky-300'
    },
    {
      color: 'success',
      flat: true,
      className:
        'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:hover:bg-emerald-800/50 dark:text-emerald-300'
    },
    {
      color: 'warning',
      flat: true,
      className:
        'bg-amber-100 text-amber-600 hover:bg-amber-200 dark:bg-amber-900/50 dark:hover:bg-amber-800/50 dark:text-amber-300'
    },
    {
      color: 'danger',
      flat: true,
      className:
        'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-800/50 dark:text-red-300'
    },
    // Ghost compound variants
    {
      color: 'primary',
      ghost: true,
      className:
        'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
    },
    {
      color: 'secondary',
      ghost: true,
      className:
        'text-sky-600 hover:bg-sky-100 dark:text-sky-400 dark:hover:bg-sky-900/40'
    },
    {
      color: 'success',
      ghost: true,
      className:
        'text-emerald-600 hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-900/40'
    },
    {
      color: 'warning',
      ghost: true,
      className:
        'text-amber-600 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/40'
    },
    {
      color: 'danger',
      ghost: true,
      className:
        'text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/40'
    }
  ],
  defaultVariants: {
    color: 'primary',
    size: 'auto',
    rounded: false,
    bordered: false,
    flat: false,
    ghost: false,
    shadow: false
  }
})
