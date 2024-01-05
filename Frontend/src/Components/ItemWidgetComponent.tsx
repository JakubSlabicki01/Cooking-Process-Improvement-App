import React from 'react';
import './ItemWidgetComponent.css';

// Update the interface to include the optional onClick prop
interface ItemWidgetProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void; // Optional onClick function
}

const ItemWidgetComponent: React.FC<ItemWidgetProps> = ({ icon, label, onClick }) => {
  return (
    // Add an onClick handler to the container div and conditionally handle clicks
    <div className={`item-widget${onClick ? ' clickable' : ''}`} onClick={onClick}>
      <div className="item-widget-icon">{icon}</div>
      <div className="item-widget-label">{label}</div>
    </div>
  );
};

export default ItemWidgetComponent;
