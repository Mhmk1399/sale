"use client";
import DynamicForm from "../DynamicForm";
import { createLayer } from "@/lib/actions/layerActions";
import { getGlasses } from "@/lib/actions/glassActions";
import { getGlassTreatments } from "@/lib/actions/glassTreatmentActions";
interface LayerFormProps {
  tempInvoiceId: string;
  onComplete: (layer: any) => void;
  onClose: () => void;
}

export default function LayerForm({ tempInvoiceId, onComplete, onClose }: LayerFormProps) {
  const fields = [
    {
      name: "glassId",
      label: "نوع شیشه",
      type: "select",
      options: async () => {
        const glasses = await getGlasses();
        return glasses.map(glass => ({
          label: glass.name,
          value: glass.id
        }));
      },
      required: true
    },
    {
      name: "width",
      label: "عرض",
      type: "text",
      required: true
    },
    {
      name: "height", 
      label: "ارتفاع",
      type: "text",
      required: true
    },
    {
      name: "treatmentIds",
      label: "عملیات",
      type: "multiselect", 
      options: async () => {
        const treatments = await getGlassTreatments();
        return treatments.map(treatment => ({
          label: treatment.name,
          value: treatment.id,
          price: treatment.price // Including additional data if needed
        }));
      },
      required: true
    }
    
    
  ];

  const handleSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      tempInvoiceId,
      treatmentIds: Array.isArray(data.treatmentIds) ? data.treatmentIds : [data.treatmentIds]
    };
    
    const newLayer = await createLayer(formattedData);
    onComplete(newLayer);
  };

  return (
    <DynamicForm
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="ثبت لایه"
    />
  );
}
