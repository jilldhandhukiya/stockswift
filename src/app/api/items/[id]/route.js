import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Item from '@/models/Item'

export async function PATCH(request, { params }) {
  const { id } = params
  try {
    const body = await request.json()
    await connectDB()
    const update = {}
    if (body.onHand != null) update.onHand = Number(body.onHand)
    if (body.reserved != null) update.reserved = Number(body.reserved)
    if (body.cost != null) update.cost = Number(body.cost)
    if (body.reorderPoint != null) update.reorderPoint = Number(body.reorderPoint)
    const item = await Item.findByIdAndUpdate(id, update, { new: true })
    if (!item) return NextResponse.json({ message: 'Item not found' }, { status: 404 })
    return NextResponse.json({
      item: {
        id: item._id,
        name: item.name,
        sku: item.sku,
        category: item.category,
        cost: item.cost,
        onHand: item.onHand,
        reserved: item.reserved,
        reorderPoint: item.reorderPoint,
        image: item.image
      }
    })
  } catch (e) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
