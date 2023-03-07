import mongoose, { Schema } from 'mongoose'

const StorageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  maxLimit: {
    type: Number,
    default: 0
  },
  used: {
    type: Number,
    default: 0
  },
  files: {
    type: Number,
    default: 0
  },
  folders: {
    type: Number,
    default: 0
  }
})

StorageSchema.set('toJSON', {
  virtuals: true
})

export default mongoose.models.StorageSchema ||
  mongoose.model('Storage', StorageSchema)
