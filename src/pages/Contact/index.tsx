import { Layout } from '@/components';
import React, { FC } from 'react';

type ContactProps = { title?: string };

const Contact: FC<ContactProps> = ({ title }) => {
  return (
    <Layout>
      Contact
      <div>{title}</div>
    </Layout>
  );
};

export default Contact;
