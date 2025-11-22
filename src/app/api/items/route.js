import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Item from '@/models/Item'

export async function GET(request) {
  try {
    await connectDB()
    const { search = '', category = '' } = Object.fromEntries(request.nextUrl.searchParams.entries())
    const query = {}
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } }
      ]
    }
    if (category) query.category = category
    const items = await Item.find(query).sort({ updatedAt: -1 }).limit(500)
    const categoriesAgg = await Item.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ])
    return NextResponse.json({
      items: items.map(i => ({
        id: i._id,
        name: i.name,
        sku: i.sku,
        category: i.category,
        cost: i.cost,
        onHand: i.onHand,
        reserved: i.reserved,
        reorderPoint: i.reorderPoint,
        image: i.image,
        updatedAt: i.updatedAt
      })),
      categories: categoriesAgg.map(c => ({ name: c._id, count: c.count }))
    })
  } catch (e) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const required = ['name', 'sku', 'category', 'cost']
    for (const f of required) {
      if (!body[f]) return NextResponse.json({ message: `Missing field: ${f}` }, { status: 400 })
    }
    await connectDB()
    const existing = await Item.findOne({ sku: body.sku.toUpperCase() })
    if (existing) return NextResponse.json({ message: 'SKU already exists' }, { status: 400 })
    const item = await Item.create({
      name: body.name,
      sku: body.sku.toUpperCase(),
      category: body.category,
      cost: Number(body.cost),
      onHand: Number(body.onHand || 0),
      reserved: Number(body.reserved || 0),
      reorderPoint: Number(body.reorderPoint || 0),
      image: body.image || ''
    })
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
    }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
