"use client";
import { useState, useEffect } from "react";

type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "date" | "select" | "multiselect";
  options?:
    | { label: string; value: string | number }[]
    | (() => Promise<{ label: string; value: string | number }[]>);
  required?: boolean;
};

type DynamicFormProps = {
  fields: FieldConfig[];
  onSubmit: (data: any) => Promise<void>;
  submitLabel?: string;
  initialData?: any;
};

export default function DynamicForm({
  fields,
  onSubmit,
  submitLabel = "ذخیره",
  initialData = {},
}: DynamicFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [selectOptions, setSelectOptions] = useState<
    Record<string, { label: string; value: string | number }[]>
  >({});

  useEffect(() => {
    fields.forEach(async (field) => {
      if ((field.type === "select" || field.type === "multiselect") && typeof field.options === "function") {
        const options = await field.options();
        setSelectOptions((prev) => ({
          ...prev,
          [field.name]: options,
        }));
      }
    });
  }, [fields]);
  

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-xl "
    >
      <div className="space-y-4  sm:space-y-6">
        {fields.map((field) => (
          <div key={field.name} className="relative">
            <label
              className="block text-md font-medium text-black mb-1 sm:mb-2"
              htmlFor={field.name}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.type === "multiselect" ? (
              <select
                name={field.name}
                multiple
                value={formData[field.name] || []}
                onChange={(e) =>
                  handleChange(
                    field.name,
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                required={field.required}
                className="block w-full px-3 py-2 text-black sm:px-4 sm:py-2.5 border border-[#6FBDF5] rounded-md shadow-sm focus:ring focus:ring-blue focus:border-transparent"
              >
                {(typeof field.options === "function"
                  ? selectOptions[field.name]
                  : field.options
                )?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                className="block w-full px-3 py-2 text-black sm:px-4 sm:py-2.5 border border-[#6FBDF5] rounded-md shadow-sm focus:ring focus:ring-blue focus:border-transparent"
              >
                <option value="">انتخاب کنید</option>
                {(typeof field.options === "function"
                  ? selectOptions[field.name]
                  : field.options
                )?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                className="block w-full px-3 py-2 text-black sm:px-4 sm:py-2.5 border border-[#6FBDF5] rounded-md shadow-sm focus:ring focus:ring-blue focus:border-transparent"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full mt-6 sm:mt-8 px-4 py-2 sm:py-3 bg-[#6FBDF5] text-white rounded-lg"
      >
        {submitLabel}
      </button>
    </form>
  );
}
