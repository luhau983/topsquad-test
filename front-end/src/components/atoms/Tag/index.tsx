import React from 'react';

import Text from '../Text';

interface IProps {
  bgColor: string;
  textColor: string;
  label: string;
}
const Tag: React.FC<IProps> = ({ bgColor, textColor, label }: IProps) => {
  return (
    <div className="h-6 py-1 px-2 flex items-center justify-center rounded-[4px]" style={{ backgroundColor: bgColor }}>
      <Text typeClass="caption-2-bold" style={{ color: textColor }}>
        {label}
      </Text>
    </div>
  );
};

export default Tag;
