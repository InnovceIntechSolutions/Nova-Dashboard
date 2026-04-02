import React from 'react';

export interface CardProps {
  title?: string;
  value?: string | number;
  unit?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ title = 'Card', value = '0', unit = '', style }) => {
  return (
    <div className="card card-body" >
      <h4 className="card-title">{title}</h4>
      <p className="card-value">
        {value}
        <span className="card-unit">{unit}</span>
      </p>
    </div>
  );
};

export default Card;
