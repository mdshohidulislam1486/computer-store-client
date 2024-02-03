import { Spin } from 'antd';

const Loading = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default Loading;
