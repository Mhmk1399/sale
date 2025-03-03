"use client";
import { motion } from "framer-motion";
import DynamicForm from "../DynamicForm";
import DynamicTable from "../charts/tables";
import { createGlass, getGlasses } from "@/lib/actions/glassActions";
import { useState, useEffect } from "react";
import { Glass, Inventory } from "@prisma/client";
import DynamicPieChart from "../charts/DynamicPieChart";

const MainGlassManagement = () => {
  type GlassWithInventory = Glass & { inventory: Inventory[] };

  const [glassData, setGlassData] = useState<GlassWithInventory[]>([]);

  const pieChartData = {
    labels: glassData.map((glass) => glass.name),
    values: glassData.map((glass) =>
      glass.inventory.reduce((total, item) => total + Number(item.amount), 0)
    ),
    colors: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#FF6384",
      "#36A2EB",
    ],
  };
  const formFields = [
    { name: "name", label: "نام شیشه", type: "text" as const, required: true },
    { name: "code", label: "کد شیشه", type: "text" as const, required: true },
    {
      name: "sellPrice",
      label: "قیمت فروش",
      type: "number" as const,
      required: true,
    },
  ];

  const tableColumns = [
    { key: "name", header: "نام شیشه" },
    { key: "code", header: "کد" },
    { key: "sellPrice", header: "قیمت فروش" },
    { key: "inventory", header: "موجودی" },
  ];

  const fetchData = async () => {
    try {
      const data = await getGlasses();
      const processedData = data.map((glass: GlassWithInventory) => ({
        ...glass,
        sellPrice: glass.sellPrice,
        inventory: glass.inventory.map((item) => ({
          ...item,
          buyPrice: item.buyPrice,
          amount: item.amount,
        })),
      }));
      setGlassData(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async (data: Glass) => {
    try {
      // First create the new glass entry
      await createGlass(data); // Add this line
      // Then fetch updated data
      const updatedGlasses = await getGlasses();
      const processedData = updatedGlasses.map((glass: GlassWithInventory) => ({
        ...glass,
        sellPrice: glass.sellPrice,
        inventory: glass.inventory.map((item) => ({
          ...item,
          buyPrice: item.buyPrice,
          amount: item.amount,
        })),
      }));
      setGlassData(processedData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const processedTableData = glassData.map((glass) => ({
    ...glass,
    inventory: glass.inventory.reduce(
      (total, item) => total + Number(item.amount),
      0
    ),
    date: new Date().toISOString(),
  }));

  return (
    <div>
      <div className="mx-auto p-6 bg-white shadow-md rounded-xl border-2 border-[#6FBDF5] p-4">
        <div className="text-2xl font-bold my-8 text-center text-black">
          پنل مدیریت انواع شیشه
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
              submitLabel="ثبت شیشه"
            />
          </div>
          <div>
            <DynamicTable columns={tableColumns} data={processedTableData} />
          </div>
        </motion.div>
      </div>
      <div className="mx-auto p-6 bg-white shadow-md rounded-xl border-2 border-[#6FBDF5] p-4 mt-12">
        <div className="text-2xl font-bold my-8 text-center text-black">
          نمودار موجودی شیشه ها{" "}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8"
        >
          <div>
            <DynamicPieChart title="موجودی انواع شیشه" data={pieChartData} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainGlassManagement;
