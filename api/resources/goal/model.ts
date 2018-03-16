import mongoose from 'mongoose'

export const schema = {
  name: {
    type: String,
    required: [true, 'Error - name is a required property of Goal'],
    unique: true
  }
}

const goalSchema = new mongoose.Schema(schema)

export const Goal = mongoose.model('goal', goalSchema)
