import React from "react";

export const Select = ({
  value,
  onChange,
  children,
  className = "",
}: {
  value?: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 ${className}`}
    >
      {children}
    </select>
  );
};

export const SelectTrigger = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={className}>{children}</div>;
};

export const SelectValue = ({ placeholder }: { placeholder: string }) => {
  return <option value="">{placeholder}</option>;
};

export const SelectContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => {
  return <option value={value}>{children}</option>;
};
