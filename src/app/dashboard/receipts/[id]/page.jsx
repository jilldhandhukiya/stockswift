'use client'

import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Navbar from '../../../components/navbar'
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Printer,
  Heart,
  Plus,
  Trash2
} from 'lucide-react'

const Badge = ({ text, color = "indigo" }) => {
  const colors = {
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    slate: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  }
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[color]}`}>
      {text}
    </span>
  )
}

// Sample receipt data
const sampleReceipts = {
  "1": {
    id: "1",
    reference: 'WH/IN/0001',
    status: 'Draft',
    statusColor: 'slate',
    from: 'vendor',
    to: 'WH/Stock1',
    receiveFrom: 'Azure Integrations',
    scheduleDate: '2025-11-22',
    responsible: 'John Doe',
    contact: 'Azure Integrations',
    products: [
      {
        id: 1,
        name: '[DESK001] Desk',
        quantity: 6
      }
    ],
    timeline: [
      { status: 'Draft', desc: 'Initial state', active: true },
      { status: 'Ready', desc: 'Ready to receive', active: false },
      { status: 'Done', desc: 'Received', active: false }
    ]
  },
  "2": {
    id: "2",
    reference: 'WH/IN/0002',
    status: 'Ready',
    statusColor: 'emerald',
    from: 'vendor',
    to: 'WH/Stock1',
    receiveFrom: 'Clever Aardvark',
    scheduleDate: '2025-11-25',
    responsible: 'Jane Smith',
    contact: 'Clever Aardvark',
    products: [
      {
        id: 1,
        name: 'Office Chairs',
        quantity: 20
      }
    ],
    timeline: [
      { status: 'Draft', desc: 'Initial state', active: false },
      { status: 'Ready', desc: 'Ready to receive', active: true },
      { status: 'Done', desc: 'Received', active: false }
    ]
  },
  "3": {
    id: "3",
    reference: 'WH/OUT/0003',
    status: 'Done',
    statusColor: 'indigo',
    from: 'customer',
    to: 'WH/Stock2',
    receiveFrom: 'Productive Bat',
    scheduleDate: '2025-11-30',
    responsible: 'Mike Johnson',
    contact: 'Productive Bat',
    products: [
      {
        id: 1,
        name: 'Laptop Stands',
        quantity: 15
      }
    ],
    timeline: [
      { status: 'Draft', desc: 'Initial state', active: false },
      { status: 'Ready', desc: 'Ready to receive', active: false },
      { status: 'Done', desc: 'Received', active: true }
    ]
  }
}

export default function ReceiptDetailPage() {
  const router = useRouter()
  const params = useParams()
  const receiptId = params.id
  
  const receipt = sampleReceipts[receiptId]
  const [isFavorite, setIsFavorite] = useState(false)
  const [products, setProducts] = useState(receipt?.products || [])
  const [status, setStatus] = useState(receipt?.status || 'Draft')

  if (!receipt) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-white text-lg">Receipt not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    const colors = {
      'Draft': 'slate',
      'Ready': 'emerald',
      'Done': 'indigo'
    }
    return colors[status] || 'indigo'
  }

  const handlePrint = () => {
    window.print()
  }

  const handleValidate = () => {
    setStatus('Ready')
  }

  const handleDeleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index))
  }

  const timeline = receipt.timeline.map(item => ({
    ...item,
    active: item.status === status
  }))

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
            <h1 className="text-3xl font-bold text-white">{receipt.reference}</h1>
            <p className="text-slate-500 text-sm mt-1">Receipt Order Details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Status and Actions */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-white font-bold text-lg mb-2">Receipt</h2>
                  <Badge text={status} color={getStatusColor(status)} />
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
                <button 
                  onClick={handleValidate}
                  disabled={status !== 'Draft'}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 text-sm font-medium transition-colors flex items-center gap-2"
                >
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
                  <label className="text-slate-500 text-xs uppercase font-semibold mb-1 block">Receive From</label>
                  <p className="text-white border-b border-slate-700 pb-2 capitalize">{receipt.from}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 text-xs uppercase font-semibold mb-1 block">Schedule Date</label>
                    <p className="text-white border-b border-slate-700 pb-2">
                      {receipt.scheduleDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-slate-500 text-xs uppercase font-semibold mb-1 block">Responsible</label>
                    <p className="text-white border-b border-slate-700 pb-2">{receipt.responsible || 'Not assigned'}</p>
                  </div>
                </div>
                <div>
                  <label className="text-slate-500 text-xs uppercase font-semibold mb-1 block">To Warehouse</label>
                  <p className="text-white border-b border-slate-700 pb-2">{receipt.to}</p>
                </div>
                <div>
                  <label className="text-slate-500 text-xs uppercase font-semibold mb-1 block">Contact</label>
                  <p className="text-white border-b border-slate-700 pb-2">{receipt.contact}</p>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg">Products</h3>
                <button
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  New Product
                </button>
              </div>

              <div className="space-y-3">
                {products && products.length > 0 ? (
                  products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                      <div className="flex-1">
                        <p className="text-white font-medium">{product.name}</p>
                        <p className="text-slate-400 text-sm mt-1">Quantity: {product.quantity}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(index)}
                        className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm text-center py-4">No products added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Timeline */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 sticky top-24">
              <h3 className="text-white font-bold text-lg mb-6">Status Timeline</h3>
              
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${item.active ? 'bg-indigo-500' : 'bg-slate-600'}`}></div>
                        {index < timeline.length - 1 && (
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
                  <p className="text-indigo-400 text-xs font-semibold uppercase mb-2">Receipt States</p>
                  <p className="text-white text-sm font-medium">
                    Draft &gt; Ready &gt; Done
                  </p>
                  <p className="text-slate-400 text-xs mt-2">
                    To DO = When in Draft. Validate = When in Ready
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