import React from 'react';
import './WidgetComponent.css';

interface WidgetProps {
  variant: 'small-dark' | 'small-bright' | 'big-dark' | 'big-bright';
  title: string;
  icon?: React.ReactNode; // This will be the icon component for the widget
  content?: React.ReactNode; // This will be the content area for the widget
  onClick?: () => void;
}

const Widget: React.FC<WidgetProps> = ({ variant, title, icon, content, onClick }) => {
    const isSmall = variant.startsWith('small');
    const isBig = variant.startsWith('big');
    return (
      <div className={`widget ${variant}`} onClick={onClick} >
        <div className="widget-header">
        <span className="widget-title">{title}</span>
        {isBig && (
          <div className="header-icon">{icon}</div>
        )}
      </div>
        
        {isSmall ? (
          <div className="widget-icon">{icon}</div>
        ) : (
          <div  className="widget-content">{content}</div>
        )}
        
      </div>
    );
};

export default Widget;
