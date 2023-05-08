import React from 'react';
import { FloatButton as Button } from 'antd';
import { CustomerServiceOutlined, CommentOutlined } from '@ant-design/icons';

export const FloatingButton: React.FC = () => (
    <>
        <Button.Group
            trigger="hover"
            type="primary"
            style={{ right: 24 }}
            icon={<CustomerServiceOutlined />}
        >
            <Button />
            <Button icon={<CommentOutlined />} />
        </Button.Group>
    </>
);
