import useUser from '@/hooks/useUser'
import Image from 'next/image'

export default function Avatar({
  src,
  alt,
  size = 'md',
  className = '',
  imageProps = {},
  ...props
}) {
  return (
    <div
      className={`flex items-center  justify-center overflow-hidden rounded-full ${SV[size]} ${className}`}
      {...props}
    >
      {src && (
        <Image
          src={src}
          width={96}
          height={96}
          alt={alt ?? 'profile picture'}
          referrerPolicy="no-referrer"
          draggable="false"
          {...imageProps}
        />
      )}
    </div>
  )
}

Avatar.Logged = function LoggedAvatar({
  size = 'md',
  className = '',
  imageProps = {},
  ...props
}) {
  const { user } = useUser()
  const { image: src, name: alt } = user
  return (
    <div
      className={`flex items-center  justify-center overflow-hidden rounded-full ${SV[size]} ${className}`}
      {...props}
    >
      {src && (
        <Image
          src={src}
          width={96}
          height={96}
          alt={alt ?? 'profile picture'}
          referrerPolicy="no-referrer"
          draggable="false"
          {...imageProps}
        />
      )}
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
