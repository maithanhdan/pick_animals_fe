import { Layout } from '@/components';
import React, { FC } from 'react';

type AboutProps = { title?: string };

const About: FC<AboutProps> = ({ title }) => {
  return (
    <Layout>
      About
      <div>{title}</div>
    </Layout>
  );
};

export default About;
