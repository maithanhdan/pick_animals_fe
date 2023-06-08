import Navbar from '@/components/Navbar';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const LayoutStyled = styled.div``;
interface ILayoutProps {
  children: ReactNode;
}
const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <LayoutStyled>
      <div>Layout</div>
      <div>
        <Navbar />
      </div>
      {children}
    </LayoutStyled>
  );
};

export default Layout;
