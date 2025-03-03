import * as customerActions from '@/lib/actions/customerActions'
import * as glassActions from '@/lib/actions/glassActions'
import * as glassTreatmentActions from '@/lib/actions/glassTreatmentActions'
import * as inventoryActions from '@/lib/actions/inventoryActions'
import * as invoiceActions from '@/lib/actions/invoiceActions'
import * as layerActions from '@/lib/actions/layerActions'
import * as priorityActions from '@/lib/actions/priorityActions'
import * as sellerActions from '@/lib/actions/sellerActions'


const tableConfigs = {
    customer: {
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'address', label: 'Address' }
      ],
      getData: customerActions.getCustomers
    },
    glass: {
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'code', label: 'Code' },
        { key: 'sellPrice', label: 'Sell Price' },
        { 
          key: 'inventory', 
          label: 'Inventory Count',
          render: (inventory: any[]) => inventory?.length || 0
        }
      ],
      getData: glassActions.getGlasses
    },
    glassTreatment: {
      columns: [
        { key: 'name', label: 'Treatment Name' },
        { key: 'price', label: 'Price' },
        { 
          key: 'layers', 
          label: 'Used In Layers',
          render: (layers: any[]) => layers?.length || 0
        }
      ],
      getData: glassTreatmentActions.getGlassTreatments
    },
    inventory: {
      columns: [
        { key: 'materialType', label: 'Material Type' },
        { 
          key: 'glass', 
          label: 'Glass',
          render: (glass: any) => glass?.name || '-'
        },
        { 
          key: 'sideMaterial', 
          label: 'Side Material',
          render: (sideMaterial: any) => sideMaterial?.name || '-'
        },
        { 
          key: 'seller', 
          label: 'Seller',
          render: (seller: any) => seller?.name || '-'
        },
        { key: 'buyPrice', label: 'Buy Price' },
        { key: 'amount', label: 'Amount' },
        { 
          key: 'enteredDate', 
          label: 'Entry Date',
          render: (date: string) => new Date(date).toLocaleDateString()
        }
      ],
      getData: inventoryActions.getInventory
    },
    invoice: {
      columns: [
        { key: 'layersLength', label: 'Layers Length' },
        { key: 'type', label: 'Type' },
        { key: 'count', label: 'Count' },
        { 
          key: 'priority', 
          label: 'Priority',
          render: (priority: any) => priority?.name || '-'
        },
        { key: 'customer', label: 'Customer' },
        { 
          key: 'dueDate', 
          label: 'Due Date',
          render: (date: string) => new Date(date).toLocaleDateString()
        },
        { 
          key: 'layers', 
          label: 'Layers Count',
          render: (layers: any[]) => layers?.length || 0
        }
      ],
      getData: invoiceActions.getInvoices
    },
    layer: {
      columns: [
        { 
          key: 'glass', 
          label: 'Glass',
          render: (glass: any) => glass?.name || '-'
        },
        { key: 'width', label: 'Width' },
        { key: 'height', label: 'Height' },
        { 
          key: 'treatments', 
          label: 'Treatments Count',
          render: (treatments: any[]) => treatments?.length || 0
        }
      ],
      getData: layerActions.getLayers
    },
    priority: {
      columns: [
        { key: 'name', label: 'Name' },
        { 
          key: 'date', 
          label: 'Date',
          render: (date: string) => new Date(date).toLocaleDateString()
        },
        { key: 'price', label: 'Price' },
        { 
          key: 'invoices', 
          label: 'Invoices Count',
          render: (invoices: any[]) => invoices?.length || 0
        }
      ],
      getData: priorityActions.getPriorities
    },
    seller: {
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'info', label: 'Information' },
        { 
          key: 'inventory', 
          label: 'Inventory Items',
          render: (inventory: any[]) => inventory?.length || 0
        }
      ],
      getData: sellerActions.getSellers
    }
  }


  export default tableConfigs
  