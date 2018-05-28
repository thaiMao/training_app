import { Schema, model } from 'mongoose'

export const schema = {
  name: {
    type: String,
    required: [true, 'Error - name is a required property of Goal'],
    unique: true
  }
}

const goalSchema = new Schema(schema)

export const Goal = model('goal', goalSchema)
