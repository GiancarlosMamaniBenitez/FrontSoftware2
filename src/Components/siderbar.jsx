import React, { useState } from "react";
import { Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, theme } from "antd";
import Link from "next/link";
import './sidebar.css';

const { Sider } = Layout;

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleCollapse = (value) => {
    setCollapsed(value);
  };

  return (
    
    <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link href="/Option1">Option 1</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link href="/Option2">Option 2</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<FileOutlined />}>
          <Link href="/Files">Files</Link>
         
        </Menu.Item>
      </Menu>   
    </Sider>
    
  );
}

export default SideBar;
