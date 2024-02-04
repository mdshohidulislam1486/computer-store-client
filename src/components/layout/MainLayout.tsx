import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { sideBarItemsGenerator } from '../../utlis/sidebar.genertors';
import { storeManagement } from '../../route/admin.routes';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';

const { Header, Content, Footer, Sider } = Layout;

const sideBar = sideBarItemsGenerator(storeManagement, 'admin');
const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Layout style={{ minHeight: '95vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '4rem',
          }}
        >
          <h1 style={{ color: 'white' }}>Computer Lab</h1>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['4']}
          items={sideBar}
        />
        <Button
          onClick={handleLogout}
          style={{ position: 'fixed', top: '20px', right: '10px' }}
        >
          Logout
        </Button>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Computer Store ©{new Date().getFullYear()} All rights reserved
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
