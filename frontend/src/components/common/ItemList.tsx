
import React from "react";

interface ItemListProps {
  children: React.ReactNode;
  viewAllLabel?: string;
  onViewAll?: () => void;
}

const ItemList: React.FC<ItemListProps> = ({
  children,
  viewAllLabel = "View all",
  onViewAll,
}) => {
  return (
    <div className="space-y-4">
      {children}
      
      {onViewAll && (
        <div className="text-center mt-4">
          <button
            className="text-sm text-medical hover:underline"
            onClick={onViewAll}
          >
            {viewAllLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;
