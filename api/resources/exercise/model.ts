import mongoose from 'mongoose'

export const schema = {
  name: {
    type: String,
    required: [true, 'Error - name is a required property of Exercise'],
    unique: true
  },
  muscle: {
    type: String,
    required: true,
    default: 'Bicep'
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'size'
  }
}

const exerciseSchema = new mongoose.Schema(schema)

export const Exercise = mongoose.model('exercise', exerciseSchema)
