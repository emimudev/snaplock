import { v2 as cloudinary } from 'cloudinary'

export async function uploadImageUnsigned({ file, folder }) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'cxter47d')
  return cloudinary.uploader.unsigned_upload(file, 'cxter47d', {
    folder: folder?.id
  })
}
