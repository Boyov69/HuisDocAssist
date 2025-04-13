
import React from "react";

export interface TodoItemProps {
  id: string;
  label: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <input 
        type="checkbox" 
        id={id} 
        className="h-4 w-4 rounded border-gray-300 text-medical focus:ring-medical"
      />
      <label 
        htmlFor={id} 
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default TodoItem;
