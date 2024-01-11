import React from 'react';
import './ItembarComponent.css';
import InputComponent from './InputComponent';

// Extend the props to include new data for the 'big' variant
interface ItembarProps {
  variant: 'small' | 'big' | 'big-add';
  itemName: string;
  quantity?: number;
  addedDate?: string;
  expiryDate: string;
  onAction?: () => void;
  onQuantityChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // New handler for quantity input
  quantityValue?: string; // New value for quantity input
  icon: React.ReactNode;
}


const Itembar: React.FC<ItembarProps> = ({
  variant,
  itemName,
  quantity,
  addedDate,
  expiryDate,
  onAction,
  onQuantityChange,
  quantityValue,
  icon,
  ...otherProps
}) => {
  // You can determine what to render based on the variant
  const isBigVariant = variant.startsWith('big');
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <img src={icon} alt={itemName} className="icon-image" />;
    }
    return icon; // If it's not a string, it's assumed to be a JSX element or ReactNode
  };

  if (variant === 'big-add') {
    return (
      <div className={`itembar ${variant}`}>
        <div className="itembar-icon">{renderIcon()}</div>
        <div className="itembar-name">{itemName}</div>
        <span className="itembar-quantity">In my fridge: {quantity}</span>

        <span className="itembar-expiry">Expires in: {expiryDate}</span>
        <InputComponent type={'text'} classElem='small' placeholder={'Quantity'} value={quantityValue} onChange={onQuantityChange} />
        <button onClick={onAction} className="itembar-add">✓</button>
      </div>
    );
  }

  return (
    <div className={`itembar ${variant}`}>
      <div className="itembar-icon">{renderIcon()}</div>
      <span className="itembar-name">{itemName}</span>
      {isBigVariant && quantity && <span className="itembar-quantity">{quantity}</span>}
      {isBigVariant && addedDate && <span className="itembar-added">{addedDate}</span>}
      <span className="itembar-expiry">{expiryDate}</span>
      {isBigVariant && onAction && (
        <button onClick={onAction} className="itembar-delete">X</button>
      )}
    </div>
  );
};

export default Itembar;
