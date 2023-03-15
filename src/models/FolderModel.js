import mongoose, { Schema } from 'mongoose'
import ImageModel from './ImageModel'

const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the folder'],
    maxlength: [100, 'Description cannot be more than 500 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  privacy: {
    typeAccess: {
      type: String,
      enum: ['public', 'private'],
      default: 'private'
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  typeElement: {
    type: String,
    enum: ['folder', 'file'],
    default: 'folder'
  },
  parentFolder: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
    default: undefined
  },
  hierarchyLevel: {
    type: Number,
    default: 0
  },
  parentFolders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Folder'
    }
  ],
  dateOpened: {
    type: Date,
    default: null
  },
  whoOpened: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  whoCreated: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isStarred: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

FolderSchema.set('toJSON', {
  virtuals: true
})

FolderSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function () {
    await ImageModel.deleteMany({ folder: this._id })
  }
)

export default mongoose.models.Folder || mongoose.model('Folder', FolderSchema)
