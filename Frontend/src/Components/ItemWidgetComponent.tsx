import React from 'react';
import './ItemWidgetComponent.css';

// Update the interface to include the optional onClick prop
interface ItemWidgetProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void; // Optional onClick function
}

const ItemWidgetComponent: React.FC<ItemWidgetProps> = ({ icon, label, onClick }) => {

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return (
        <div>
        <img src={icon} alt={label} className="item-widget-icon" loading="lazy" />
        </div>
      )
    }
    return icon; // If it's not a string, it's assumed to be a JSX element or ReactNode
  };

  return (
    // Add an onClick handler to the container div and conditionally handle clicks
    <div className={`item-widget${onClick ? ' clickable' : ''}`} onClick={onClick}>
      <div className="item-widget-icon">{renderIcon()}</div>
      <div className="item-widget-label">{label}</div>
    </div>
  );
};

export default ItemWidgetComponent;
