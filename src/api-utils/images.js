import FolderModel from '@/models/FolderModel'
import ImageModel from '@/models/ImageModel'
import UserModel from '@/models/UserModel'

export async function createImages({ images }) {
  return ImageModel.insertMany(images)
}

export async function getImage({ imageId }) {
  return ImageModel.findById(imageId).populate(DEFAULT_POPULATE_OPTIONS)
}

export async function getImages(conditions) {
  return ImageModel.findOne(conditions).populate(DEFAULT_POPULATE_OPTIONS)
}

const DEFAULT_POPULATE_OPTIONS = [
  {
    path: 'folder',
    model: FolderModel
  },
  {
    path: 'owner',
    model: UserModel
  },
  {
    path: 'uploadBy',
    model: UserModel
  },
  {
    path: 'privacy.members',
    model: UserModel
  }
]
