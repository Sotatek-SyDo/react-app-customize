import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import WrapperHeader from '@/components/organisms/header/WrapperHeader';
import MenuAdmin from './components/MenuAdmin';
import './scss/homepage.scss';

const { Content, Sider } = Layout;

const HomePage = () => {
  return (
    <Layout className="main-layout">
      <Suspense fallback={null}>
        <WrapperHeader />
      </Suspense>
      <Content>
        <Layout className="container">
          <Sider width={296} className="sider-admin">
            <MenuAdmin />
          </Sider>
          <Content className="main-content">
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default HomePage;
