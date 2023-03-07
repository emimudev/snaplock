import axios from 'axios'
import { BASE_URL } from './config'

export const IMAGES_API_URL = `${BASE_URL}/images`
export const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME
export const UPPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET

const imagesAPI = {
  getImages({ folderId }) {
    return axios
      .get(`${IMAGES_API_URL}${folderId ? `?folderId=${folderId}` : ''}`)
      .then((response) => response.data)
  },
  getImage({ id }) {
    return axios
      .get(`${IMAGES_API_URL}/${id}`)
      .then((response) => response.data)
  },
  async createImages({ folder, images, userId }) {
    const URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    const response = await Promise.allSettled(
      images.map((file) => {
        formData.append('file', file)
        formData.append('upload_preset', UPPLOAD_PRESET)
        formData.append('cloud_name', CLOUD_NAME)
        formData.append(
          'folder',
          folder ? `snaplock/${folder?.id}` : `snaplock/${userId}`
        )

        return axios.post(URL, formData)
      })
    )
    const imagesCreated = response.map((res) => res?.value?.data)
    return axios
      .post(IMAGES_API_URL, { folder, images: imagesCreated })
      .then((response) => response.data)
  },
  updateImage({ id, file }) {
    return axios
      .put(`${IMAGES_API_URL}/${id}`, file)
      .then((response) => response.data)
  },
  deleteImage({ id }) {
    return axios
      .delete(`${IMAGES_API_URL}/${id}`)
      .then((response) => response.data)
  }
}

export default imagesAPI
