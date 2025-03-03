'use client'
import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import DynamicForm from '@/app/components/DynamicForm'
import DynamicTable from '@/app/components/DynamicTable'
import  formConfigs  from '@/lib/configArrays/formConfigs'
import  tableConfigs  from '@/lib/configArrays/tableConfigs'
import MainGlassTreatmentManagement from './components/GlassTreatmentManagement/mainGlassTreatmentManagement'
import MainGlassManagement from './components/glassManagement/mainGlassManagement'
import LayerForm from './components/invoice/layerForm'
import InvoiceForm from './components/invoice/invoice'
export default function FormsPage() {
  const [activeForm, setActiveForm] = useState<string | null>(null)
  const [tableData, setTableData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async (formType: string) => {
    setLoading(true)
    try {
      const data = await tableConfigs[formType as keyof typeof tableConfigs].getData()
      setTableData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (activeForm) {
      fetchData(activeForm)
    }
  }, [activeForm])

  const handleFormSubmit = async (data: any) => {
    await formConfigs[activeForm as keyof typeof formConfigs].action(data)
    fetchData(activeForm as string)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <Sidebar onSelect={setActiveForm} activeItem={activeForm} />

        {/* {activeForm && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {formConfigs[activeForm as keyof typeof formConfigs].title}
              </h2>
              <DynamicForm
                fields={formConfigs[activeForm as keyof typeof formConfigs].fields}
                onSubmit={handleFormSubmit}
                submitLabel="Save"
              />
            </div>

            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : (
              tableData.length > 0 && (
                <DynamicTable
                  columns={tableConfigs[activeForm as keyof typeof tableConfigs].columns}
                  data={tableData}
                />
              )
            )}
          </div>
        )} */}
        {/* <MainGlassManagement /> */}
          {/* <MainGlassTreatmentManagement /> */}
          <InvoiceForm />
          {/* <LayerForm /> */}
      </div>
    </div>
  )
}