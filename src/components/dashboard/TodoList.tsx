
import React from "react";
import { ClipboardList } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";
import TodoItem, { TodoItemProps } from "@/components/todos/TodoItem";

const todos: Omit<TodoItemProps, 'id'>[] = [
  { label: "Recepten controleren en ondertekenen" },
  { label: "Labresultaten beoordelen" },
  { label: "Verwijzingen schrijven" },
  { label: "Teamoverleg 16:00" }
];

const TodoList: React.FC = () => {
  return (
    <AccordionCard 
      title="Te doen vandaag" 
      icon={<ClipboardList className="h-5 w-5" />}
      className="mt-4"
    >
      <div className="space-y-2">
        {todos.map((todo, index) => (
          <TodoItem 
            key={index}
            id={`task${index + 1}`}
            label={todo.label}
          />
        ))}
      </div>
    </AccordionCard>
  );
};

export default TodoList;
