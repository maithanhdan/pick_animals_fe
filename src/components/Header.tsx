import React, { FC } from 'react';

type HeaderProps = { title?: string };

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div>
      Header
      <div>{title}</div>
    </div>
  );
};

export default Header;
