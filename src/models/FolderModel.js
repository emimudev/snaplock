import mongoose, { Schema } from 'mongoose'

const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the folder']
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
  opened: {
    date: Date,
    whoOpened: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  created: {
    date: {
      type: Date,
      default: Date.now
    },
    whoCreated: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  isStarred: {
    type: Boolean,
    default: false
  }
})

FolderSchema.index(
  { name: 1, owner: 1, parentFolder: 1 },
  { unique: true, sparse: true }
)

FolderSchema.set('toJSON', {
  virtuals: true
})

export default mongoose.models.Folder || mongoose.model('Folder', FolderSchema)
