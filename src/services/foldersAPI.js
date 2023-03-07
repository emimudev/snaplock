import axios from 'axios'
import { BASE_URL } from './config'

export const FOLDERS_API_URL = `${BASE_URL}/folders`
export const SUBFOLDERS_API_URL = `${BASE_URL}/subfolders`

const foldersAPI = {
  getFolders() {
    return axios.get(`${FOLDERS_API_URL}`).then((response) => response.data)
  },
  getFolder({ id }) {
    return axios
      .get(`${FOLDERS_API_URL}/${id}`)
      .then((response) => response.data)
  },
  createFolder(folder) {
    return axios
      .post(`${FOLDERS_API_URL}`, folder)
      .then((response) => response.data)
  },
  updateFolder({ id, folder }) {
    return axios
      .put(`${FOLDERS_API_URL}/${id}`, folder)
      .then((response) => response.data)
  },
  restoreFolder(folder) {
    return axios
      .put(`${FOLDERS_API_URL}/${folder.id}`, folder)
      .then((response) => response.data)
  },
  deleteFolder({ id }) {
    return axios
      .delete(`${FOLDERS_API_URL}/${id}`)
      .then((response) => response.data)
  },
  getSubFolders({ parentFolderId }) {
    return axios
      .get(`${SUBFOLDERS_API_URL}/${parentFolderId}`)
      .then((response) => response.data)
  },
  createSubFolder({ parentFolderId, folder }) {
    return axios
      .post(`${SUBFOLDERS_API_URL}/${parentFolderId}`, folder)
      .then((response) => response.data)
  },
  getDeletedFolders() {
    return axios
      .get(`${BASE_URL}/bin/folders`)
      .then((response) => response.data)
  },
  removeForever({ id }) {
    return axios
      .delete(`${BASE_URL}/bin/folders/${id}`)
      .then((response) => response.data)
  },
  starredFolder({ folder }) {
    folder.isStarred = true
    return axios
      .put(`${FOLDERS_API_URL}/${folder.id}`, folder)
      .then((response) => response.data)
  }
}

export default foldersAPI
