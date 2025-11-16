import { ReactNode } from "react"

const NutritionalInfoItem = ({ label, value, children }: { label: string, value: string | number, children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center">
      {children}
      <p className="text-3xl font-bold text-green-600 dark:text-green-400 my-2">
        {value}
      </p>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {label}
      </p>
    </div>
  )
}

export default NutritionalInfoItem;
