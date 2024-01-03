import React from 'react';
import './ItemWidgetComponent.css'

interface ItemWidgetProps {
  icon: React.ReactNode; // Accepts any React renderable content
  label: string; // Text label for the item
}

const ItemWidgetComponent: React.FC<ItemWidgetProps> = ({ icon, label }) => {
  return (
    <div className="item-widget">
      <div className="item-widget-icon">{icon}</div>
      <div className="item-widget-label">{label}</div>
    </div>
  );
};

export default ItemWidgetComponent;
