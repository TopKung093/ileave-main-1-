import { Button, Checkbox, Form, Input, Row, Col, Card, Space, notification } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import router from 'next/router';
const LoginPage: React.FC = () => {
  const onFinish = async (values: any) => {
    try {
      const data = {
        username: values?.username,
        password: values?.password,
      }
      const result = await axios(
        {
          method: "post",
          url: `/api/auth/login`,
          data: data,
        })
      console.log('data', data)
      if (result?.status === 200) {
        const user = result?.data?.data
        Cookies.set('user',
          JSON.stringify({
            token: user?.token,
            username: user?.username,
            name: user?.name,
            lastname: user?.lastname
          }))
        console.log('result', result.data)
        notification["success"]({
          message: ("Success Sign in."),
        })

        if (Cookies.get("user") !== undefined) {
          router.push("/")
        }
      } else if (result?.status === 500) {
        notification["error"]({
          message: ("Invalid Sign in."),
        })
      }
    } catch (err) {
      console.log("error here :", err)
      notification["error"]({
        message: ("Invalid Sign in."),
      })
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Row style={{ background: '#1C2453', height: '70px', paddingTop: '10px' }}>
        <Colstyled span={2} offset={1} ><Link href="../Statics"><img src="../images/LogoW.png" width='45%' /></Link></Colstyled>
        <ColText >ระบบลางานออนไลน์</ColText>
      </Row>
      <Row justify="center">
        <img src="../images/bggg.png" width='100%' height='100%' style={{ position: 'fixed' }} />
      </Row>
      <Row justify="center"
        style={{ marginTop: "0px", marginBottom: "70px" }}>
        <Col span={12} offset={18}>
          <Space direction="vertical" style={{ display: 'flex' }}>
            <Card style={{ borderRadius: "0px", background: "#fff", height: '890px', width: '60%', border: '0px solid #fff', }} >
              <Formstyle
                name="basic"
                layout="vertical"
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <img src="../images/iapp-test.png" width='100%' style={{ marginLeft: '-10px' }} />
                <Form.Item wrapperCol={{ offset: 5, span: 24 }} label="Username" name="username" required
                  rules={[{ required: true, message: 'Please input your username!' }]}
                  style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>
                  <Input name="username"
                    style={{ borderRadius: "24px", width: '300px', height: '40px' }} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 5, span: 24 }} label="Password" name="password" required
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', paddingTop: '10px' }}>
                  <Input.Password name="password"
                    style={{ borderRadius: "20px", width: '300px', height: '40px', paddingTop: '10px' }} />
                </Form.Item>
                <Row justify="center">
                  <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 1, span: 24 }} >
                    <Checkbox style={{ fontSize: '16px', paddingTop: '20px' }}>Remember me</Checkbox>
                  </Form.Item></Row>
                <Row justify="center">
                  <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
                    <Button type="primary" htmlType="submit"
                      style={{ borderRadius: "25px", fontWeight: "bold", height: '50px', width: '120px' }}>เข้าสู่ระบบ</Button>
                  </Form.Item></Row>
              </Formstyle>
            </Card>
          </Space></Col>
      </Row>



    </>
  );
};
const ColText = styled(Col)`

  font-size: 33px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
  padding-top: 5px;
  color: #fff;
`
const Formstyle = styled(Form)`
.ant-form-item-label > label {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: 32px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  padding-left: 100px;
  color: #000;
}
`
const Colstyled = styled(Col)`
    margin-Top: -10px;
`

export default LoginPage;