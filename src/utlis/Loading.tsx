import { Flex, Spin } from 'antd';

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
      <Flex gap="small" vertical>
        <Flex gap="small">
          <Spin tip="Loading " size="large" style={{ position: 'relative' }}>
            <div className="content" />
          </Spin>
        </Flex>
      </Flex>
    </div>
  );
};

export default Loading;
