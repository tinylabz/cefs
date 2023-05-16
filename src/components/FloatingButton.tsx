import React from 'react';
import { FloatButton as Button } from 'antd';
import { DesktopOutlined, CommentOutlined } from '@ant-design/icons';

export const FloatingButton: React.FC = () => (
    <>
        <Button.Group
            trigger="hover"
            type="primary"
            style={{ right: 24 }}
            icon={<DesktopOutlined />}
        >
            <Button icon={<CommentOutlined />} />
        </Button.Group>
    </>
);
