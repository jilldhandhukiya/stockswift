'use client'

import React, { useState } from 'react'
import Navbar from '../components/navbar'
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Grid3x3, 
  List,
  MapPin,
  Phone,
  Calendar,
  Package,
  ChevronRight,
  AlertCircle,
  Edit,
  Eye,
  Trash2,
  Truck,
  CheckCircle,
  Clock,
  X
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

const DeliveryModal = ({ isOpen, isEdit, delivery, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    delivery || {
      reference: '',
      product: '',
      from: '',
      to: '',
      contact: '',
      scheduleDate: '',
      quantity: '',
      status: 'Ready'
    }
  )
  const [errors, setErrors] = useState({})

  React.useEffect(() => {
    if (delivery) {
      setFormData(delivery)
    } else {
      setFormData({
        reference: '',
        product: '',
        from: '',
        to: '',
        contact: '',
        scheduleDate: '',
        quantity: '',
        status: 'Ready'
      })
    }
    setErrors({})
  }, [delivery, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.reference.trim()) newErrors.reference = 'Reference is required'
    if (!formData.product.trim()) newErrors.product = 'Product is required'
    if (!formData.from.trim()) newErrors.from = 'From location is required'
    if (!formData.to.trim()) newErrors.to = 'To location is required'
    if (!formData.contact.trim()) newErrors.contact = 'Contact is required'
    if (!formData.scheduleDate) newErrors.scheduleDate = 'Schedule date is required'
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required'
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {isEdit ? 'Edit Delivery' : 'Create New Delivery'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Reference */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Reference <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="e.g., WH/OUT/0001"
              className={`w-full px-4 py-2.5 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                errors.reference ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-indigo-500'
              }`}
            />
            {errors.reference && <p className="text-red-400 text-sm mt-1">{errors.reference}</p>}
          </div>

          {/* Product */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Product Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="e.g., Steel Frames (50mm)"
              className={`w-full px-4 py-2.5 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                errors.product ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-indigo-500'
              }`}
            />
            {errors.product && <p className="text-red-400 text-sm mt-1">{errors.product}</p>}
          </div>

          {/* From and To */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                From Location <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                placeholder="e.g., WH/Stock1"
                className={`w-full px-4 py-2.5 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.from ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-indigo-500'
                }`}
              />
              {errors.from && <p className="text-red-400 text-sm mt-1">{errors.from}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                To Location <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="e.g., Vendor"
                className={`w-full px-4 py-2.5 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.to ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-indigo-500'
                }`}
              />
              {errors.to && <p className="text-red-400 text-sm mt-1">{errors.to}</p>}
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Contact Person <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="e.g., Azure Interior"
              className={`w-full px-4 py-2.5 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                errors.contact ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-indigo-500'
              }`}
            />
            {errors.contact && <p className="text-red-400 text-sm mt-1">{errors.contact}</p>}
          </div>

          {/* Schedule Date and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Schedule Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="scheduleDate"
                value={formData.scheduleDate}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-slate-800 border rounded-lg text-white focus:outline-none transition-colors ${
                  errors.scheduleDate ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-indigo-500'
                }`}
              />
              {errors.scheduleDate && <p className="text-red-400 text-sm mt-1">{errors.scheduleDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Quantity <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., -50 Units"
                className={`w-full px-4 py-2.5 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.quantity ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-indigo-500'
                }`}
              />
              {errors.quantity && <p className="text-red-400 text-sm mt-1">{errors.quantity}</p>}
            </div>
          </div>

          {/* Status */}
          {isEdit && (
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="Ready">Ready</option>
                <option value="Picking">Picking</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]"
            >
              {isEdit ? 'Update Delivery' : 'Create Delivery'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const ActionDropdown = ({ delivery, onAction, isOpen, onToggle }) => (
  <div className="relative">
    <button
      onClick={() => onToggle(delivery.id)}
      className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-700/50 rounded"
    >
      <MoreHorizontal className="w-4 h-4" />
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
        
        <button
          onClick={() => {
            onAction(delivery.id, 'edit')
            onToggle(null)
          }}
          className="w-full px-4 py-2 text-left text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 flex items-center gap-2 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit Delivery
        </button>

        <button
          onClick={() => {
            onAction(delivery.id, 'dispatch')
            onToggle(null)
          }}
          disabled={delivery.status === 'Dispatched' || delivery.status === 'Delivered' || delivery.status === 'Cancelled'}
          className="w-full px-4 py-2 text-left text-sm text-slate-400 hover:text-indigo-400 hover:bg-slate-700/50 flex items-center gap-2 transition-colors border-t border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Truck className="w-4 h-4" />
          Mark as Dispatched
        </button>

        <button
          onClick={() => {
            onAction(delivery.id, 'delivered')
            onToggle(null)
          }}
          disabled={delivery.status === 'Delivered' || delivery.status === 'Cancelled'}
          className="w-full px-4 py-2 text-left text-sm text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 flex items-center gap-2 transition-colors border-t border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle className="w-4 h-4" />
          Mark as Delivered
        </button>

        <button
          onClick={() => {
            onAction(delivery.id, 'cancel')
            onToggle(null)
          }}
          disabled={delivery.status === 'Delivered' || delivery.status === 'Cancelled'}
          className="w-full px-4 py-2 text-left text-sm text-slate-400 hover:text-red-400 hover:bg-slate-700/50 flex items-center gap-2 transition-colors border-t border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-4 h-4" />
          Cancel Delivery
        </button>

        <button
          onClick={() => {
            onAction(delivery.id, 'delete')
            onToggle(null)
          }}
          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2 transition-colors border-t border-slate-700"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    )}
  </div>
)

const DeliveryCard = ({ delivery, onAction, openDropdown, onToggleDropdown }) => (
  <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 hover:border-indigo-500/30 transition-colors">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h4 className="font-mono text-sm font-bold text-white">{delivery.reference}</h4>
        <p className="text-xs text-slate-400 mt-1">{delivery.product}</p>
      </div>
      <Badge text={delivery.status} color={delivery.statusColor} />
    </div>
    
    <div className="space-y-2 text-xs text-slate-400 mb-4">
      <div className="flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5" />
        <span>{delivery.from} → {delivery.to}</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="w-3.5 h-3.5" />
        <span>{delivery.contact}</span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="w-3.5 h-3.5" />
        <span>{delivery.scheduleDate}</span>
      </div>
    </div>
    
    <div className="pt-3 border-t border-slate-700 flex justify-between items-center">
      <span className="text-sm font-medium text-white">{delivery.quantity}</span>
      <ActionDropdown 
        delivery={delivery} 
        onAction={onAction}
        isOpen={openDropdown === delivery.id}
        onToggle={onToggleDropdown}
      />
    </div>
  </div>
)

const NotificationToast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
    info: 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400',
    warning: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
    error: 'bg-red-500/20 border-red-500/30 text-red-400'
  }

  return (
    <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg border ${colors[type]} z-50 animate-slide-in`}>
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}

export default function DeliveryPage() {
  const [viewMode, setViewMode] = useState('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [openDropdown, setOpenDropdown] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDelivery, setEditingDelivery] = useState(null)
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      reference: 'WH/OUT/0001',
      product: 'Steel Frames (50mm)',
      from: 'WH/Stock1',
      to: 'Vendor',
      contact: 'Azure Interior',
      scheduleDate: '2025-11-25',
      quantity: '-50 Units',
      status: 'Ready',
      statusColor: 'emerald'
    },
    {
      id: 2,
      reference: 'WH/OUT/0002',
      product: 'Office Chairs',
      from: 'WH/Stock1',
      to: 'Vendor',
      contact: 'Azure Interior',
      scheduleDate: '2025-11-26',
      quantity: '-20 Units',
      status: 'Ready',
      statusColor: 'emerald'
    },
    {
      id: 3,
      reference: 'WH/OUT/0003',
      product: 'Steel Rods (10mm)',
      from: 'WH/Stock1',
      to: 'Production Floor',
      contact: 'Production Manager',
      scheduleDate: '2025-11-27',
      quantity: '+100 kg',
      status: 'Picking',
      statusColor: 'amber'
    },
    {
      id: 4,
      reference: 'WH/OUT/0004',
      product: 'Nuts & Bolts',
      from: 'WH/Stock1',
      to: 'Assembly Line',
      contact: 'Assembly Lead',
      scheduleDate: '2025-11-28',
      quantity: '-500 Units',
      status: 'Dispatched',
      statusColor: 'indigo'
    },
    {
      id: 5,
      reference: 'WH/OUT/0005',
      product: 'Wooden Pallets',
      from: 'WH/Stock2',
      to: 'External Warehouse',
      contact: 'Logistics Partner',
      scheduleDate: '2025-11-29',
      quantity: '-30 Units',
      status: 'Delivered',
      statusColor: 'emerald'
    },
    {
      id: 6,
      reference: 'WH/OUT/0006',
      product: 'Packaging Materials',
      from: 'WH/Stock1',
      to: 'Shipping Dept',
      contact: 'Shipping Supervisor',
      scheduleDate: '2025-11-30',
      quantity: '-1000 Box',
      status: 'Cancelled',
      statusColor: 'red'
    },
  ])

  const getStatusColor = (status) => {
    const statusColors = {
      'Ready': 'emerald',
      'Picking': 'amber',
      'Dispatched': 'indigo',
      'Delivered': 'emerald',
      'Cancelled': 'red'
    }
    return statusColors[status] || 'indigo'
  }

  const handleAction = (id, action) => {
    const delivery = deliveries.find(d => d.id === id)
    
    const statusMap = {
      edit: () => {
        setEditingDelivery(delivery)
        setIsModalOpen(true)
      },
      dispatch: () => {
        updateDeliveryStatus(id, 'Dispatched', 'indigo')
        setNotification({
          message: `${delivery.reference} marked as Dispatched`,
          type: 'success'
        })
      },
      delivered: () => {
        updateDeliveryStatus(id, 'Delivered', 'emerald')
        setNotification({
          message: `${delivery.reference} marked as Delivered`,
          type: 'success'
        })
      },
      cancel: () => {
        updateDeliveryStatus(id, 'Cancelled', 'red')
        setNotification({
          message: `${delivery.reference} has been cancelled`,
          type: 'warning'
        })
      },
      delete: () => {
        deleteDelivery(id)
        setNotification({
          message: `${delivery.reference} has been deleted`,
          type: 'error'
        })
      }
    }

    statusMap[action]?.()
  }

  const updateDeliveryStatus = (id, newStatus, newColor) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, status: newStatus, statusColor: newColor } : d
    ))
  }

  const deleteDelivery = (id) => {
    setDeliveries(deliveries.filter(d => d.id !== id))
  }

  const handleSaveDelivery = (formData) => {
    if (editingDelivery) {
      // Update existing delivery
      setDeliveries(deliveries.map(d =>
        d.id === editingDelivery.id
          ? {
              ...d,
              ...formData,
              statusColor: getStatusColor(formData.status)
            }
          : d
      ))
      setNotification({
        message: `${formData.reference} has been updated`,
        type: 'success'
      })
    } else {
      // Create new delivery
      const newDelivery = {
        id: Math.max(...deliveries.map(d => d.id), 0) + 1,
        ...formData,
        statusColor: getStatusColor(formData.status)
      }
      setDeliveries([...deliveries, newDelivery])
      setNotification({
        message: `${formData.reference} has been created`,
        type: 'success'
      })
    }
    setIsModalOpen(false)
    setEditingDelivery(null)
  }

  const handleOpenModal = () => {
    setEditingDelivery(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingDelivery(null)
  }

  const filteredDeliveries = deliveries.filter(delivery =>
    delivery.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.product.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#020617] text-slate-400 font-sans">
      
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                NEW
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white">Delivery Operations</h1>
          </div>

          <button 
            onClick={handleOpenModal}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]">
            <Plus className="w-4 h-4" />
            New Delivery
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by reference or product..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-slate-800/30 rounded-xl border border-slate-700 overflow-hidden">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-800/50 text-xs uppercase font-medium text-slate-500 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">From</th>
                  <th className="px-6 py-4">To</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Schedule Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-white">{delivery.reference}</td>
                    <td className="px-6 py-4 text-white">{delivery.product}</td>
                    <td className="px-6 py-4">{delivery.from}</td>
                    <td className="px-6 py-4">{delivery.to}</td>
                    <td className="px-6 py-4">{delivery.contact}</td>
                    <td className="px-6 py-4">{delivery.scheduleDate}</td>
                    <td className="px-6 py-4">
                      <Badge text={delivery.status} color={delivery.statusColor} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ActionDropdown 
                        delivery={delivery} 
                        onAction={handleAction}
                        isOpen={openDropdown === delivery.id}
                        onToggle={setOpenDropdown}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredDeliveries.length === 0 && (
              <div className="px-6 py-12 text-center">
                <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No deliveries found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeliveries.map((delivery) => (
              <DeliveryCard 
                key={delivery.id} 
                delivery={delivery} 
                onAction={handleAction}
                openDropdown={openDropdown}
                onToggleDropdown={setOpenDropdown}
              />
            ))}
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-12 bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-6">
          <div className="flex gap-4">
            <Package className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h3 className="text-white font-semibold mb-1">Populate all delivery orders</h3>
              <p className="text-slate-400 text-sm">
                All delivery orders will be automatically populated here with real-time status updates and CRUD operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Modal */}
      <DeliveryModal 
        isOpen={isModalOpen}
        isEdit={!!editingDelivery}
        delivery={editingDelivery}
        onClose={handleCloseModal}
        onSave={handleSaveDelivery}
      />

      {/* Notification Toast */}
      {notification && (
        <NotificationToast 
          message={notification.message} 
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}