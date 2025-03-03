"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCustomers } from "@/lib/actions/customerActions";
import LayerForm from "./layerForm";
import { BsCloudUpload } from "react-icons/bs";
import { FaLayerGroup, FaCopy, FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface Customer {
  id: number;
  name: string;
  phone: string | null;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Layer {
  id: number | string;
  name: string;
}

export default function InvoiceForm() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [mapFile, setMapFile] = useState<File | null>(null);
  const [productType, setProductType] = useState("");
  const [showLayerForm, setShowLayerForm] = useState(false);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [tempInvoiceId] = useState(`TEMP_${Date.now()}`);
  const [editingLayer, setEditingLayer] = useState(null);
  const [selectedSideMaterials, setSelectedSideMaterials] = useState([]);
  const [showSideMaterialModal, setShowSideMaterialModal] = useState(false);
  const [selectedMaterialType, setSelectedMaterialType] = useState('');
const [width, setWidth] = useState('');
const [length, setLength] = useState('');
const [selectedColor, setSelectedColor] = useState('');
const [quantity, setQuantity] = useState('1');

const colors = [
  { id: 'white', name: 'سفید' },
  { id: 'brown', name: 'قهوه‌ای' },
  { id: 'black', name: 'مشکی' },
];

const handleAddSideMaterial = () => {
  const newMaterial = {
    type: selectedMaterialType,
    dimensions: `${width}×${length}`,
    color: colors.find(c => c.id === selectedColor)?.name,
    quantity: parseInt(quantity)
  };
  
  setSelectedSideMaterials(prev => [...prev, newMaterial]);
  setShowSideMaterialModal(false);
  
  // Reset form
  setSelectedMaterialType('');
  setWidth('');
  setLength('');
  setSelectedColor('');
  setQuantity('1');
};

  const standardSizes = [
    { name: "کوچک", dimensions: "6×8", price: 1500000 },
    { name: "متوسط", dimensions: "8×10", price: 2000000 },
    { name: "بزرگ", dimensions: "10×12", price: 2500000 },
  ];

  const laminateTypes = [
    { id: 1, name: "شفاف" },
    { id: 2, name: "مات" },
    { id: 3, name: "رنگی" },
  ];

  const laminateThicknesses = [6, 8, 10, 12];

  const handleSizeSelect = (size) => {
    // Handle size selection logic
  };

  const removeSideMaterial = (index) => {
    setSelectedSideMaterials((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteLayer = (index: number) => {
    const newLayers = layers.filter((_, i) => i !== index);
    setLayers(newLayers);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      const customerData = await getCustomers();
      setCustomers(customerData);
    };
    fetchCustomers();
  }, []);

  const handleDuplicateLayer = (layerIndex: number) => {
    const layerToDuplicate = layers[layerIndex];
    setLayers([...layers, { ...layerToDuplicate, id: `TEMP_${Date.now()}` }]);
  };

  const handleSaveInvoice = async () => {
    // Create invoice and update layers with real invoice ID
    // Add your invoice creation logic here
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-1">
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="w-full p-4 border text-black border-[#6FBDF5] rounded-sm  "
          >
            <option value="">انتخاب مشتری</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id.toString()}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="w-full p-4 border text-black border-[#6FBDF5] rounded-sm  "
          >
            <option value="">انتخاب اولویت</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id.toString()}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <input
            type="text"
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
            placeholder="شماره فاکتور"
            className="w-full p-3 border text-black border-[#6FBDF5] rounded-sm  "
          />
        </div>
      </div>

      {/* Map Upload Section */}
      <div className="mb-8">
        <div className="border-2 border-dashed border-[#6FBDF5] rounded-md p-6 text-center">
          <input
            type="file"
            id="mapUpload"
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setMapFile(files[0]);
              }
            }}
            accept="image/*,.pdf"
          />
          <label htmlFor="mapUpload" className="cursor-pointer">
            <BsCloudUpload className="mx-auto text-4xl text-[#6FBDF5] mb-2" />
            <span className="text-gray-600">آپلود نقشه</span>
          </label>
          {mapFile && (
            <p className="mt-2 text-sm text-gray-500">{mapFile.name}</p>
          )}
        </div>
      </div>

      {/* Product Type Selection */}
      {/* Product Type Selection with Dynamic Content */}
      <div className="mb-8 space-y-4">
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="w-full p-3 border-2 border-[#6FBDF5] rounded-md text-black focus:border-[#6FBDF5]"
        >
          <option value="doubalglazed">دو جداره</option>
          <option value="laminate">لمینت</option>
          <option value="combo">ترکیبی</option>
        </select>

        {productType === "doubalglazed" && (
          <div className="overflow-x-auto rounded-lg border border-[#6FBDF5]">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-50 text-black">
                <tr>
                  <th className="px-4 py-3 border-b border-[#6FBDF5] text-black">
                    ابعاد (سانتی‌متر)
                  </th>
                  <th className="px-4 py-3 border-b border-[#6FBDF5] text-black">
                    سایز استاندارد
                  </th>
                  <th className="px-4 py-3 border-b border-[#6FBDF5] text-black">
                    قیمت (تومان)
                  </th>
                  <th className="px-4 py-3 border-b border-[#6FBDF5] text-black">
                    انتخاب
                  </th>
                </tr>
              </thead>
              <tbody>
                {standardSizes.map((size, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b text-black border-[#6FBDF5]">
                      {size.name}
                    </td>
                    <td className="px-4 py-3 border-b text-black border-[#6FBDF5]">
                      {size.dimensions}
                    </td>
                    <td className="px-4 py-3 border-b text-black border-[#6FBDF5]">
                      {size.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 border-b text-black border-[#6FBDF5]">
                      <input
                        type="radio"
                        name="standardSize"
                        onChange={() => handleSizeSelect(size)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {productType === "laminate" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[#6FBDF5] text-black rounded-lg">
                <h3 className="font-medium mb-2">انتخاب نوع لمینت</h3>
                <select className="w-full p-2 border rounded">
                  {laminateTypes.map((type, index) => (
                    <option key={index} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-4 border rounded-lg txt-black border-[#6FBDF5]">
                <h3 className="font-medium  text-black mb-2">ضخامت لمینت</h3>
                <div className="flex gap-4">
                  {laminateThicknesses.map((thickness, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input type="radio" name="thickness" value={thickness} />
                      <span className="text-black">{thickness} میلی‌متر</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {productType === "combo" && (
          <div className="space-y-4">
            <button
              onClick={() => setShowSideMaterialModal(true)}
              className="w-full p-3 bg-[#E8F4FE] text-[#6FBDF5] rounded-lg hover:bg-[#d1e9fd] transition-colors"
            >
              افزودن متریال جانبی
            </button>
            {selectedSideMaterials.length > 0 && (
              <div className="border border-[#6FBDF5] rounded-lg p-4">
                <h3 className="font-medium mb-3 text-black">متریال‌های انتخاب شده</h3>
                <div className="space-y-2">
                  {selectedSideMaterials.map((material, index) => (
                    <div
                      key={index}
                      className="flex text-black justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span className="border-b border-[#6FBDF5]">{material.name}</span>
                      <button
                        onClick={() => removeSideMaterial(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <IoClose size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Side Materials Modal */}
      <AnimatePresence>
        {showSideMaterialModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-xl w-full max-w-2xl relative"
            >
              <div className="flex justify-between text-black items-center mb-6">
                <h2 className="text-xl font-bold">افزودن متریال جانبی</h2>
                <button
                  onClick={() => setShowSideMaterialModal(false)}
                  className="text-black hover:text-gray-700"
                >
                  <IoClose size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Material Type Selection */}
                <div className="space-y-2 text-black">
                  <label className="block text-gray-700">نوع متریال</label>
                  <select
                    className="w-full p-3 border border-[#6FBDF5] rounded-lg focus:border-[#6FBDF5]"
                    value={selectedMaterialType}
                    onChange={(e) => setSelectedMaterialType(e.target.value)}
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="aluminum">اسپیسر</option>
                    <option value="upvc">پی وی بی</option>
                    <option value="wood">چسب قوی</option>
                  </select>
                </div>

                {/* Size Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-gray-700">
                      عرض (سانتی‌متر)
                    </label>
                    <input
                      type="number"
                      placeholder="عرض"
                      className="w-full p-3 border border-[#6FBDF5] text-black rounded-lg focus:border-[#6FBDF5]"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-black">
                      طول (سانتی‌متر)
                    </label>
                    <input
                      type="number"
                      placeholder="طول"
                      className="w-full p-3 border border-[#6FBDF5] text-black rounded-lg focus:border-[#6FBDF5]"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                  </div>
                </div>

                {/* Color Selection */}
                <div className="space-y-2">
                  <label className="block text-black">رنگ</label>
                  <div className="grid grid-cols-3 gap-3">
                    {colors.map((color) => (
                      <label
                        key={color.id}
                        className={`flex items-center p-3 border border-[#6FBDF5] text-black rounded-lg cursor-pointer ${
                          selectedColor === color.id
                            ? "border-[#6FBDF5] bg-[#E8F4FE]"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="color"
                          value={color.id}
                          checked={selectedColor === color.id}
                          onChange={() => setSelectedColor(color.id)}
                          className="hidden"
                        />
                        <span>{color.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <label className="block text-gray-700">تعداد</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-[#6FBDF5] rounded-lg focus:border-[#6FBDF5]"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddSideMaterial}
                    className="flex-1 bg-[#6FBDF5] text-white py-3 rounded-lg hover:bg-[#5CA8E0] transition-colors"
                  >
                    افزودن
                  </button>
                  <button
                    onClick={() => setShowSideMaterialModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layers Section */}
      <div className="space-y-4">
        {layers.map((layer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 relative"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#E8F4FE] text-[#6FBDF5] px-3 py-1 rounded-full text-sm">
                    جدار {index + 1}
                  </span>
                  <h3 className="font-semibold text-black">{layer.name}</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-black ">شماره فاکتور</span>
                    <span className=" font-medium text-black text-xs border-l">
                      {layer.id}{" "}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black">عرض</span>
                    <span className="font-medium  text-black border-l ">
                      {layer.width}{" "}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black">ارتفاع</span>
                    <span className="font-medium  text-black border-l">
                      {" "}
                      {layer.height}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black">نوع شیشه</span>
                    <span className="font-medium  text-black border-l">
                      شیشه نوع 1
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black">عملیات</span>
                    <div className="flex flex-wrap gap-1 text-black border-l">
                      سوراخ کاری
                    </div>{" "}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black">قیمت</span>
                    <div className="flex flex-wrap gap-1 text-black">
                      3000000
                    </div>{" "}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingLayer(layer)}
                  className="p-2 text-gray-600 hover:bg-[#E8F4FE] hover:text-[#6FBDF5] rounded-full transition-colors"
                  title="ویرایش لایه"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => handleDuplicateLayer(index)}
                  className="p-2 text-gray-600 hover:bg-[#E8F4FE] hover:text-[#6FBDF5] rounded-full transition-colors"
                  title="کپی لایه"
                >
                  <FaCopy size={16} />
                </button>
                <button
                  onClick={() => {
                    /* Add delete handler */
                  }}
                  className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
                  title="حذف لایه"
                >
                  <IoClose size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        <button
          onClick={() => setShowLayerForm(true)}
          className="w-full p-4 bg-[#6FBDF5] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#5CA8E0] transition-colors"
        >
          <FaLayerGroup />
          افزودن لایه جدید
        </button>
      </div>

      {/* Layer Form Modal */}
      <AnimatePresence>
        {editingLayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className=" p-6 rounded-xl w-full max-w-2xl relative"
            >
              <button
                onClick={() => setEditingLayer(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
              <LayerForm
                initialData={editingLayer}
                tempInvoiceId={tempInvoiceId}
                onComplete={(updatedLayer) => {
                  const newLayers = layers.map((l) =>
                    l.id === editingLayer.id ? updatedLayer : l
                  );
                  setLayers(newLayers);
                  setEditingLayer(null);
                }}
                onClose={() => setEditingLayer(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Layer Form Modal */}
      <AnimatePresence>
        {showLayerForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className=" p-6 rounded-xl w-full max-w-2xl relative"
            >
              <button
                onClick={() => setShowLayerForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
              <LayerForm
                tempInvoiceId={tempInvoiceId}
                onComplete={(newLayer: Layer) => {
                  setLayers([...layers, newLayer]);
                  setShowLayerForm(false);
                }}
                onClose={() => setShowLayerForm(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={handleSaveInvoice}
        className="mt-8 w-full p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
      >
        ذخیره فاکتور
      </button>
    </div>
  );
}
