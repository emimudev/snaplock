import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
  file: {
    type: {
      asset_id: String,
      public_id: String,
      version: Number,
      version_id: String,
      signature: String,
      width: Number,
      height: Number,
      format: String,
      resource_type: String,
      created_at: Date,
      tags: [String],
      bytes: Number,
      etag: String,
      placeholder: Boolean,
      url: String,
      secure_url: String,
      folder: String,
      original_filename: String,
      original_extension: String
    }
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null
  },
  privacy: {
    typeAccess: {
      type: String,
      enum: ['public', 'private'],
      default: 'private'
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isStarred: {
    type: Boolean,
    default: false
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  uploadBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

ImageSchema.set('toJSON', {
  virtuals: true
})

export default mongoose.models.Image || mongoose.model('Image', ImageSchema)
