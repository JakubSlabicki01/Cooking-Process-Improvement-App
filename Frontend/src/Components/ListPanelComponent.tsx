import React from 'react';
import './ListPanelComponent.css';

interface ListPanelProps {
    variant: string;
    label?: string;  // Optional label prop
    children?: React.ReactNode;
  }

const headers: { [key: string]: JSX.Element } = {
    default: (
      <>
        <span>Name</span>
        <span>Quantity</span>
        <span>Added</span>
        <span>Expire</span>
      </>
    ),

    ingredients: (
        <>
          <span>Ingredients</span>
          <span>Difficulty</span>
          <span>Prepatation Time</span>
          <span>Recipe</span>
        </>
      ),

      recipe: (
        <>
          <span>Name</span>
          <span>Difficulty</span>
          <span>Servings</span>
          <span>Preparation Time</span>
        </>
      ),

      expiry: (
        <>
          <span>Name</span>
          <span>You have</span>
          <span>Expires in</span>
          <span>Quantity</span>
        </>
      ),
  };

const ListPanelComponent: React.FC<ListPanelProps> = ({ variant, label, children }) => {
    const headerContent = headers[variant] || headers.default;
  
    return (
        <div className={'main'}>
            <div className='list-panel-label'>{label}</div>
      <div className={`list-panel ${variant}`}>
        {variant !== 'blank' && headerContent && <div className="list-panel-header">{headerContent}</div>}
        <div className="list-panel-content">{children}</div>
      </div>
      </div>
    );
  };
  
  export default ListPanelComponent;