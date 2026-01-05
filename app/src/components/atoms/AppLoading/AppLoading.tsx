import { Spin } from 'antd';
import React from 'react';

const AppLoading: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Spin size="large" />
        </div>
    );
};

export default AppLoading;
