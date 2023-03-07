export const FILE_MEASURES = {
  KB: 1024,
  MB: 1048576,
  MAX_STORAGE: 209715200
}

export function fileSizeReadable(size) {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'KB', 'MB', 'GB', 'TB'][i]
  )
}
