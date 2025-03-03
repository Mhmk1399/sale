import * as customerActions from '@/lib/actions/customerActions'
import * as glassActions from '@/lib/actions/glassActions'
import * as glassTreatmentActions from '@/lib/actions/glassTreatmentActions'
import * as inventoryActions from '@/lib/actions/inventoryActions'
import * as invoiceActions from '@/lib/actions/invoiceActions'
import * as layerActions from '@/lib/actions/layerActions'
import * as priorityActions from '@/lib/actions/priorityActions'
import * as sellerActions from '@/lib/actions/sellerActions'

const formConfigs = {
  customer: {
    title: 'مدیریت مشتری',
    fields: [
      { name: 'name', label: 'نام', type: 'text', required: true },
      { name: 'phone', label: 'تلفن', type: 'text' },
      { name: 'address', label: 'آدرس', type: 'text' }
    ],
    action: customerActions.createCustomer
  },
  glass: {
    title: 'مدیریت شیشه',
    fields: [
      { name: 'name', label: 'نام', type: 'text', required: true },
      { name: 'code', label: 'کد', type: 'text', required: true },
      { name: 'sellPrice', label: 'قیمت فروش', type: 'number', required: true }
    ],
    action: glassActions.createGlass
  },
  glassTreatment: {
    title: 'عملیات شیشه',
    fields: [
      { name: 'name', label: 'نام عملیات', type: 'text', required: true },
      { name: 'price', label: 'قیمت', type: 'number', required: true }
    ],
    action: glassTreatmentActions.createGlassTreatment
  },
  inventory: {
    title: 'مدیریت انبار',
    fields: [
      { 
        name: 'materialType', 
        label: 'نوع متریال', 
        type: 'select',
        options: [
          { label: 'شیشه', value: 'GLASS' },
          { label: 'متریال جانبی', value: 'SIDE_MATERIAL' }
        ],
        required: true 
      },
      { 
        name: 'glassId', 
        label: 'شیشه', 
        type: 'select',
        options: async () => {
          const glasses = await glassActions.getGlasses()
          return glasses.map(glass => ({
            label: `${glass.name} - ${glass.code}`,
            value: glass.id
          }))
        }
      },
      { 
        name: 'sellerId', 
        label: 'فروشنده', 
        type: 'select',
        options: async () => {
          const sellers = await sellerActions.getSellers()
          return sellers.map(seller => ({
            label: seller.name,
            value: seller.id
          }))
        },
        required: true
      },
      { name: 'buyPrice', label: 'قیمت خرید', type: 'number', required: true },
      { name: 'amount', label: 'تعداد', type: 'text', required: true },
      { name: 'enteredDate', label: 'تاریخ ورود', type: 'date', required: true }
    ],
    action: inventoryActions.createInventory
  },
  invoice: {
    title: 'مدیریت فاکتور',
    fields: [
      { name: 'layersLength', label: 'تعداد لایه‌ها', type: 'number', required: true },
      { name: 'type', label: 'نوع', type: 'text', required: true },
      { name: 'count', label: 'تعداد', type: 'number', required: true },
      { 
        name: 'priorityId', 
        label: 'اولویت',
        type: 'select',
        options: async () => {
          const priorities = await priorityActions.getPriorities()
          return priorities.map(priority => ({
            label: priority.name,
            value: priority.id
          }))
        },
        required: true
      },
      { name: 'customer', label: 'مشتری', type: 'text', required: true },
      { name: 'dueDate', label: 'تاریخ تحویل', type: 'date', required: true }
    ],
    action: invoiceActions.createInvoice
  },
  layer: {
    title: 'مدیریت لایه',
    fields: [
      {
        name: 'glassId',
        label: 'شیشه',
        type: 'select',
        options: async () => {
          const glasses = await glassActions.getGlasses()
          return glasses.map(glass => ({
            label: `${glass.name} - ${glass.code}`,
            value: glass.id
          }))
        },
        required: true
      },
      { name: 'width', label: 'عرض', type: 'number', required: true },
      { name: 'height', label: 'ارتفاع', type: 'number', required: true },
      {
        name: 'invoiceId',
        label: 'فاکتور',
        type: 'select',
        options: async () => {
          const invoices = await invoiceActions.getInvoices()
          return invoices.map(invoice => ({
            label: `${invoice.customer} - ${new Date(invoice.dueDate).toLocaleDateString('fa-IR')}`,
            value: invoice.id
          }))
        },
        required: true
      }
    ],
    action: layerActions.createLayer
  },

  priority: {
    title: 'مدیریت اولویت',
    fields: [
      { name: 'name', label: 'نام', type: 'text', required: true },
      { name: 'date', label: 'تاریخ', type: 'text', required: true },
      { name: 'price', label: 'قیمت', type: 'number', required: true }
    ],
    action: priorityActions.createPriority
  },
  seller: {
    title: 'مدیریت فروشنده',
    fields: [
      { name: 'name', label: 'نام', type: 'text', required: true },
      { name: 'info', label: 'توضیحات', type: 'text' }
    ],
    action: sellerActions.createSeller
  }
}

export default formConfigs
