import { Button, Checkbox, Form, Input, Row, Image, Layout, Col, Card, Space, Avatar } from 'antd';
import Images from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const { Header, Content, Footer, Sider } = Layout;
const App: React.FC = (
    ModalNavbar: any, setModalNavbar: any
) => {
    return (
        <>
            <Row justify="start" style={{ background: '#064595', height: '70px', paddingTop: '10px' }}>
                <Colstyled span={2} style={{ textAlign: 'center' }}><img src="../images/LogoW.png" width='45%' /></Colstyled>
                <Colstyle span={2}><Link href="../Leave">ลางาน</Link></Colstyle>
                <Colstyle span={3}><Link href="../Work_From_Home">ทำงานที่บ้าน</Link></Colstyle>
                <Colstyle span={4}><Link href="../Request_to_offsite">ขออนุญาตออกนอกสถานที่</Link></Colstyle>
                <Colstyle span={12} style={{ paddingLeft: '10px', textAlign: 'right', paddingRight: '20px' }}><Avatar size={52} src="../images/profile.png" style={{ padding: '5px' }}></Avatar>OOO OOO
                    <Link href="../login"><img src="../images/LO.png" width='50px' height='50px' style={{ padding: '5px' }} /></Link></Colstyle>

            </Row>
        </>
    );
};


const Colstyle = styled(Col)`
    color: #fff;
    font-Weight: '900';
    line-height: 45px;
    font-Size: 25px;
    a {
        color: #fff;
`
const Colstyled = styled(Col)`
    margin-Top: -10px;
`

export default App;