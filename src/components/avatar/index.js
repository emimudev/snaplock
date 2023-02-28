import Image from 'next/image'

export default function Avatar({
  src,
  alt,
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <div
      className={`flex items-center  justify-center overflow-hidden rounded-full ${SV[size]} ${className}`}
      {...props}
    >
      <Image
        src={src}
        width={96}
        height={96}
        alt={alt ?? 'profile picture'}
        referrerpolicy="no-referrer"
        draggable="false"
      />
    </div>
  )
}

/**
 * Size Variants
 */
const SV = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}
