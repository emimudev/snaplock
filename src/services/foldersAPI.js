import axios from 'axios'
import { BASE_URL } from './config'

const ENTRY_POINT = 'folders'
export const FOLDERS_API_URL = `${BASE_URL}/${ENTRY_POINT}`

const foldersAPI = {
  getFolders() {
    return axios
      .get(`${BASE_URL}/${ENTRY_POINT}`)
      .then((response) => response.data)
  },
  getFolder({ id }) {
    return axios
      .get(`${BASE_URL}/${ENTRY_POINT}/${id}`)
      .then((response) => response.data)
  },
  createFolder(folder) {
    return axios
      .post(`${BASE_URL}/${ENTRY_POINT}`, folder)
      .then((response) => response.data)
  },
  updateFolder({ id, folder }) {
    return axios
      .put(`${BASE_URL}/${ENTRY_POINT}/${id}`, folder)
      .then((response) => response.data)
  },
  deleteFolder({ id }) {
    return axios
      .delete(`${BASE_URL}/${ENTRY_POINT}/${id}`)
      .then((response) => response.data)
  }
}

export default foldersAPI
