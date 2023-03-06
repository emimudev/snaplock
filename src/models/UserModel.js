import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email for the user']
  },
  image: String
})

UserSchema.set('toJSON', {
  virtuals: true
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
