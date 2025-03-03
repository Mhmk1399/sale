"use client";
import { motion } from "framer-motion";
import DynamicForm from "../DynamicForm";
import DynamicTable from "../charts/tables";
import { createGlassTreatment, getGlassTreatments } from "@/lib/actions/glassTreatmentActions";
import { useState, useEffect } from "react";
import { GlassTreatment, Layer } from "@prisma/client";
import DynamicPieChart from "../charts/DynamicPieChart";

const MainGlassTreatmentManagement = () => {
  type TreatmentWithLayers = GlassTreatment & { layers: Layer[] };
  const [treatmentData, setTreatmentData] = useState<TreatmentWithLayers[]>([]);

  const formFields = [
    { name: "name", label: "نام خدمات", type: "text" as const, required: true },
    { name: "price", label: "قیمت خدمات", type: "text" as const, required: true }
  ];
  const tableColumns = [
    { key: "name", header: "نام خدمات" },
    { key: "price", header: "قیمت" },
    { 
      key: "layers", 
      header: "تعداد استفاده",
      render: (treatment: TreatmentWithLayers) => treatment.layers?.length || 0
    },
    
    
];

const pieChartData = {
    labels: treatmentData.map(treatment => treatment.name),
    values: treatmentData.map(treatment => treatment.layers?.length || 0),
    colors: [
      "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
      "#9966FF", "#FF9F40", "#FF6384", "#36A2EB"
    ]
};


  const fetchData = async () => {
    try {
      const data = await getGlassTreatments();
      setTreatmentData(data as unknown as TreatmentWithLayers[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async (data: GlassTreatment) => {
    try {
      await createGlassTreatment(data);
      fetchData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <div className="mx-auto p-6 bg-white shadow-md rounded-xl border-2 border-[#6FBDF5] p-4">
        <div className="text-2xl font-bold my-8 text-center text-black">
          پنل مدیریت خدمات روی شیشه
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div>
            <DynamicForm
              fields={formFields}
              onSubmit={handleFormSubmit}
              submitLabel="ثبت خدمات"
            />
          </div>
          <div>
            <DynamicTable columns={tableColumns} data={treatmentData} />
          </div>
        </motion.div>
      </div>
      <div className="mx-auto p-6 bg-white shadow-md rounded-xl border-2 border-[#6FBDF5] p-4 mt-12">
        <div className="text-2xl font-bold my-8 text-center text-black">
          نمودار استفاده از خدمات
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-6 mb-8"
        >
          <div>
            <DynamicPieChart title="میزان استفاده از خدمات" data={pieChartData} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainGlassTreatmentManagement;
