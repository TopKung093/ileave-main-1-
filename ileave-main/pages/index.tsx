import { notification } from 'antd';
import React from 'react';
import { NextPage } from 'next';
import Navebar from '../Components/Layout/Navbar_Admin'
export async function getServerSideProps(context: any) {
  const user = context.req?.cookies?.user || ""
  if (user) {
    const getCookie = JSON.parse(
      context.req?.cookies?.user?.replace("j:", "").replace("u", "")
    )

    if (getCookie?.token === undefined) {
      notification["error"]({
        message: "กรุณาเข้าสู่ระบบ",
      })
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
        props: {
          user: {},
        },
      }
    }
    if (getCookie?.token !== undefined) {
      return {
        props: {
          user: getCookie,
        },
      }
    }
  }
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
    props: {},
  }
}
const Home: NextPage = (props) => (
  <>
    <Navebar />
  </>
);

export default Home;