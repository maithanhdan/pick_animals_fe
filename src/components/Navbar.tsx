import { Link } from 'react-router-dom';

import React, { FC } from 'react';

const Navbar: FC = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: 20 }}>
        <li>
          <Link to='/'>Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
