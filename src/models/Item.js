import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  sku: { type: String, required: true, unique: true, uppercase: true },
  category: { type: String, required: true, trim: true },
  cost: { type: Number, required: true, min: 0 },
  onHand: { type: Number, required: true, min: 0, default: 0 },
  reserved: { type: Number, required: true, min: 0, default: 0 },
  reorderPoint: { type: Number, required: true, min: 0, default: 0 },
  image: { type: String, default: '' }
}, { timestamps: true })

export default mongoose.models.Item || mongoose.model('Item', ItemSchema)
