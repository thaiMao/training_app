import mongoose from 'mongoose'

export const schema = {
  name: {
    type: String,
    required: [true, 'Error - name is a required property of User'],
    unique: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Error - passwordHash is a required property of User']
  },
  age: {
    type: Number,
    required: false
  }
}

const userSchema = new mongoose.Schema(schema)

export const User = mongoose.model('user', userSchema)
