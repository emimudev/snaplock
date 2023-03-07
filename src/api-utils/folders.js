import FolderModel from '@/models/FolderModel'
import UserModel from '@/models/UserModel'

export async function getAndUpdateFolder(filter, update) {
  return FolderModel.findOneAndUpdate(filter, update, { new: true }).populate(
    DEFAULT_POPULATE_OPTIONS
  )
}

export async function getFolderById({ folderId }) {
  return FolderModel.findById(folderId).populate(DEFAULT_POPULATE_OPTIONS)
}

export async function getFolder(conditions) {
  return FolderModel.findOne(conditions).populate(DEFAULT_POPULATE_OPTIONS)
}

export async function getFolders(conditions) {
  return FolderModel.find({ ...conditions }).populate(DEFAULT_POPULATE_OPTIONS)
}

export async function removeFolder({ id }) {
  return FolderModel.findByIdAndUpdate(id, { isForeverDeleted: true })
}

const DEFAULT_POPULATE_OPTIONS = [
  {
    path: 'owner',
    model: UserModel
  },
  {
    path: 'parentFolder',
    model: FolderModel
  },
  {
    path: 'whoCreated',
    model: UserModel
  },
  {
    path: 'privacy.members',
    model: UserModel
  },
  {
    path: 'parentFolders',
    model: FolderModel
  }
]
