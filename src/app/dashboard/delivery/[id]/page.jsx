'use client'

import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Navbar from '../../../components/navbar'
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Printer,
  Download,
  Heart,
  X,
  Plus,
  Trash2,
  Edit
} from 'lucide-react'

const Badge = ({ text, color = "indigo" }) => {
  const colors = {
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
  }
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[color]}`}>
      {text}
    </span>
  )
}

const deliveryData = {
  1: {
    id: 1,
    reference: 'WH/OUT/0001',
    status: 'Ready',
    statusColor: 'emerald',
    deliveryAddress: '123 Main Street, New York, NY 10001',
    scheduleDate: '2025-11-25',
    responsible: 'John Doe',
    operationType: 'Outbound',
    products: [
      {
        id: 1,
        name: '[DESK001] Desk',
        quantity: 6,
        inStock: true
      }
    ],
    timeline: [
      { status: 'Draft', desc: 'Initial state', active: false },
      { status: 'Waiting', desc: 'Waiting for the out of stock product to be in ready to deliver/receive', active: false },
      { status: 'Ready', desc: 'Ready to deliver/receive', active: true },
      { status: 'Done', desc: 'Received or delivered', active: false }
    ]
  },
  2: {
    id: 2,
    reference: 'WH/OUT/0002',
    status: 'Ready',
    statusColor: 'emerald',
    deliveryAddress: 'Azure Interior Office, Downtown',
    scheduleDate: '2025-11-26',
    responsible: 'Jane Smith',
    operationType: 'Outbound',
    products: [
      {
        id: 1,
        name: 'Office Chairs',
        quantity: 20,
        inStock: true
      }
    ],
    timeline: [
      { status: 'Draft', desc: 'Initial state', active: false },
      { status: 'Waiting', desc: 'Waiting for the out of stock product to be in ready to deliver/receive', active: false },
      { status: 'Ready', desc: 'Ready to deliver/receive', active: true },
      { status: 'Done', desc: 'Received or delivered', active: false }
    ]
  }
}

export default function DeliveryDetailPage() {
  const router = useRouter()
  const params = useParams()
  const deliveryId = parseInt(params.id)
  const delivery = deliveryData[deliveryId] || deliveryData[1]
  
  const [products, setProducts] = useState(delivery.products)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddProduct = () => {
    alert('Add product functionality')
  }

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId))
  }

  const handleValidate = () => {
    alert('Delivery validated')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-400 font-sans">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">{delivery.reference}</h1>
            <p className="text-slate-500 text-sm mt-1">Delivery Order Details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Status and Actions */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-white font-bold text-lg mb-2">Delivery</h2>
                  <Badge text={delivery.status} color={delivery.statusColor} />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-lg transition-colors ${isFavorite ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 text-slate-400 hover:text-white'}`}
                  >
                    <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium transition-colors flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Validate
                </button>
                <button 
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="text-slate-500 text-xs uppercase font-semibold mb-1 block">Delivery Address</label>
                  <p className="text-white border-b border-slate-700 pb-2">{delivery.deliveryAddress}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 text-xs uppercase font-semibold mb-1 block">Schedule Date</label>
                    <p className="text-white border-b border-slate-700 pb-2">{delivery.scheduleDate}</p>
                  </div>
                  <div>
                    <label className="text-slate-500 text-xs uppercase font-semibold mb-1 block">Responsible</label>
                    <p className="text-white border-b border-slate-700 pb-2">{delivery.responsible}</p>
                  </div>
                </div>
                <div>
                  <label className="text-slate-500 text-xs uppercase font-semibold mb-1 block">Operation Type</label>
                  <p className="text-white border-b border-slate-700 pb-2">{delivery.operationType}</p>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg">Products</h3>
                <button
                  onClick={handleAddProduct}
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                >
                  Add New product
                </button>
              </div>

              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                    <div className="flex-1">
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-slate-400 text-sm mt-1">Quantity: {product.quantity}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {product.inStock ? (
                        <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          In Stock
                        </span>
                      ) : (
                        <span className="text-red-400 text-sm font-medium flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          Out of Stock
                        </span>
                      )}
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Timeline */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 sticky top-24">
              <h3 className="text-white font-bold text-lg mb-6">Status Timeline</h3>
              
              <div className="space-y-6">
                {delivery.timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${item.active ? 'bg-indigo-500' : 'bg-slate-600'}`}></div>
                        {index < delivery.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${item.active ? 'bg-indigo-500' : 'bg-slate-600'}`}></div>
                        )}
                      </div>
                      <div className="pb-4">
                        <p className={`font-semibold ${item.active ? 'text-indigo-400' : 'text-slate-400'}`}>
                          {item.status}
                        </p>
                        <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* State Indicator */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                  <p className="text-indigo-400 text-xs font-semibold uppercase mb-2">Current State</p>
                  <p className="text-white text-sm font-medium">
                    Draft &gt; Waiting? &gt; Ready &gt; Done
                  </p>
                  <p className="text-slate-400 text-xs mt-2">
                    Alert the notification & mark the line red if product is not in stock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}