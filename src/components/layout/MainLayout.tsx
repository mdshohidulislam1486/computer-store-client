import React from 'react';
import { Badge, Button, Layout, Menu } from 'antd';
import { sideBarItemsGenerator } from '../../utlis/sidebar.genertors';
import { storeManagement } from '../../route/seller.routes';
import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { currentUserData, logout } from '../../redux/features/auth/authSlice';
import { purchaseManagement } from '../../route/buyer.route';
import { useSelector } from 'react-redux';
import { currentCart } from '../../redux/features/cart/cartSlice';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const sellerItems = sideBarItemsGenerator(storeManagement, 'seller');
const buyerItems = sideBarItemsGenerator(purchaseManagement, 'buyer');
const MainLayout: React.FC = () => {
  const user = useAppSelector(currentUserData);
  const cart = useAppSelector(currentCart);
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
        style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
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
          items={user?.role === 'buyer' ? buyerItems : sellerItems}
        />
        <Button
          onClick={handleLogout}
          style={{ position: 'absolute', marginLeft: '10px', bottom: 30 }}
        >
          Logout
        </Button>
      </Sider>
      <Layout>
        <Header style={{ padding: '10px' }}>
          <Link
            to="/buyer/checkout"
            style={{ position: 'absolute', right: '5%' }}
          >
            <Badge
              count={cart?.totalItem | 0}
              offset={[8, 3]}
              color="red"
              size="default"
              style={{ cursor: 'pointer' }}
            >
              <ShoppingCartOutlined
                style={{ color: 'white', fontSize: '24px' }}
              />
            </Badge>
          </Link>
        </Header>
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
