import React, { FC, memo } from 'react';

interface IMyMemoComponentProps {
  text: string | number;
}

const MyMemoComponent: FC<IMyMemoComponentProps> = ({ text = '' }) => {
  return <div>{text}</div>;
};

export default memo(MyMemoComponent);
