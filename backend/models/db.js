import 'dotenv/config'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URL)

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    maxLength: 50
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 30
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },

})

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }

})

export const User = mongoose.model('User', UserSchema)
export const Account = mongoose.model('Account', AccountSchema)