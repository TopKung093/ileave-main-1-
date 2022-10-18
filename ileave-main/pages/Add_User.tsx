import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavbarHead from '../Components/Layout/Navbar_Admin'
import AddUserModal from '../Components/Modal/Leave_Modal'
import { Button, Form, Row, Col, Divider, DatePicker, Table, Switch, Input, notification, Typography } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import router from 'next/router';
interface IModalAddUser {
    header?: string
    status?: string
    visible?: boolean
    value?: any
  }
const App: React.FC = () => {
    const [modal, setModal] = useState<IModalAddUser>({
        header: "",
        status: "",
        visible: false,
        value: {},
    })
    const [status, setStatus] = useState()
    const [User, setUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(0)
    const [search, setSearch] = useState<string>("")
    let pageSize: number = 10
    const [position, setPosition] = useState([
        {
            pos_id: "",
            pos_name: "",
        },
    ])
    const [role, setRole] = useState([
        {
            role_id: "",
            role_name: "",
        },
    ])
    const [department, setDepartment] = useState([
        {
            dep_id: "",
            dep_name: "",
        },
    ])
    const [positionFilter, setPositionFilter] = useState({
        where: {},
        query: "",
        limit: 10,
        skip: 0,
    })
    const [filter, setFilter] = useState({
        where: {},
        query: "",
        limit: pageSize,
        skip: 0,
    })
    const [rolefilter, setRoleFilter] = useState({
        where: {},
        query: "",
        limit: pageSize,
        skip: 0,
    })
    const [departmentfilter, setDepartmentFilter] = useState({
        where: {},
        query: "",
        limit: pageSize,
        skip: 0,
    })
    useEffect(() => {
        queryUser(filter)
    }, [filter, setFilter])
    useEffect(() => {
        queryPosition(positionFilter)
    }, [positionFilter, setPositionFilter])
    useEffect(() => {
        queryRole(rolefilter)
    }, [rolefilter, setRoleFilter])
    useEffect(() => {
        queryDepartment(departmentfilter)
    }, [departmentfilter, setDepartmentFilter])
    const queryUser = async (filter: any) => {
        setLoading(true)
        const result = await axios({
            method: "post",
            url: `/api/user/query`,
            data: filter,
        }).catch((err) => {
            if (err) {
                if (err?.response?.data?.message?.status === 401) {
                    notification["error"]({
                        message: "Query ข้อมูลไม่สำเร็จ",
                        description: "กรุณาเข้าสู่ระบบ",
                    })
                    Cookies.remove("user")
                    Router.push("/login")
                }
            }
        })
        if (result?.status === 200) {
            setTotalPage(result?.data?.data)
            setUser(result?.data?.data)
            setLoading(false)
        } else {
            setTotalPage(0)
            setUser([])
            setLoading(false)
        }
        console.log('result.data.data====>>', result?.data?.data);
    }
    const queryPosition = async (filter: any) => {
        const result = await axios({
            method: "post",
            url: `/api/position/query`,
            data: filter,
        }).catch((err) => {
            if (err) {
                if (err?.response?.data?.message?.status === 401) {
                    notification["error"]({
                        message: "Query ข้อมูลไม่สำเร็จ",
                        description: "กรุณาเข้าสู่ระบบ",
                    })
                    Cookies.remove("user")
                    router.push("/login")
                }
            }
        })
        if (result?.status === 200) {
            console.log("result position >>>> ", result?.data?.data)
            let positionData: any[] = []
            result?.data?.data.map((value: any) => {
                positionData.push({
                    pos_id: value._id,
                    pos_name: value?.name,
                })
            })

            setPosition(positionData)
        }
    }
    const queryRole = async (filter: any) => {
        const result = await axios({
            method: "post",
            url: `/api/role/query`,
            data: filter,
        }).catch((err) => {
            if (err) {
                if (err?.response?.data?.message?.status === 401) {
                    notification["error"]({
                        message: "Query ข้อมูลไม่สำเร็จ",
                        description: "กรุณาเข้าสู่ระบบ",
                    })
                    Cookies.remove("user")
                    router.push("/login")
                }
            }
        })
        if (result?.status === 200) {
            console.log("result role >>>> ", result?.data?.data)
            let roleData: any[] = []
            result?.data?.data.map((value: any) => {
                roleData.push({
                    role_id: value._id,
                    role_name: value?.name,
                })
            })

            setRole(roleData)
        }
    }
    const queryDepartment = async (filter: any) => {
        const result = await axios({
            method: "post",
            url: `/api/department/query`,
            data: filter,
        }).catch((err) => {
            if (err) {
                if (err?.response?.data?.message?.status === 401) {
                    notification["error"]({
                        message: "Query ข้อมูลไม่สำเร็จ",
                        description: "กรุณาเข้าสู่ระบบ",
                    })
                    Cookies.remove("user")
                    router.push("/login")
                }
            }
        })
        if (result?.status === 200) {
            console.log("result department >>>> ", result?.data?.data)
            let departmentData: any[] = []
            result?.data?.data.map((value: any) => {
                departmentData.push({
                    dep_id: value._id,
                    dep_name: value?.name,
                })
            })

            setDepartment(departmentData)
        }
    }
    const onAddUser = async (value: any) => {
        const result = await axios({
          method: 'post',
          url: `/api/user/create`,
          data: value
        }).catch((err) => {
          if (err) {
            if (err?.response?.data?.message?.status === 401) {
              notification["error"]({
                message: "Query ข้อมูลไม่สำเร็จ",
                description: "กรุณาเข้าสู่ระบบ",
              })
              Cookies.remove("user")
              router.push("/login")
            }
          }
        })
        if (result?.status === 200) {
          notification['success']({
            message: ("groups-add-success")
          })
          queryUser(filter)
        } else if (result?.status === 401) {
          notification['error']({
            message: ("groups-add-failed"),
            description: ("validate-login")
          })
        }
      }
    const columns: any = [
        {
            title: 'รหัสพนักงาน',
            dataIndex: 'user_id',
            key: 'user_id',
            align: 'center',
        },
        {
            title: 'ชื่อ',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'นามสกุล',
            dataIndex: 'lastname',
            key: 'lastname',
            align: 'center',
        },
        {
            title: 'เบอร์โทร',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
        },
        {
            title: 'ระดับการทำงาน',
            dataIndex: 'level',
            key: 'level',
            align: 'center',

        },
        {
            title: 'ตำแหน่ง',
            dataIndex: 'position_id',
            key: 'position_id',
            align: 'center',
            render: (_: any, record: any) => (
                <>
                    {position?.map((value: any, index: number) => {
                        if (value?.pos_id === record?.position_id) {
                            return <Typography key={index}>{value?.pos_name}</Typography>
                        }
                    })}
                </>
            ),
        },
        {
            title: 'แผนก',
            dataIndex: 'department_id',
            key: 'department_id',
            align: 'center',
            render: (_: any, record: any) => (
                <>
                    {department?.map((value: any, index: number) => {
                        if (value?.dep_id === record?.department_id) {
                            return <Typography key={index}>{value?.dep_name}</Typography>
                        }
                    })}
                </>
            ),
        },
        {
            title: 'หน้าที่',
            dataIndex: 'role_id',
            key: 'role_id',
            align: 'center',
            render: (_: any, record: any) => (
                <>
                    {role?.map((value: any, index: number) => {
                        if (value?.role_id === record?.role_id) {
                            return <Typography key={index}>{value?.role_name}</Typography>
                        }
                    })}
                </>
            )
        }
    ];



    return (
        <>
            <NavbarHead />
            <Row>
                <Col span={20} offset={2}><p style={{ fontSize: '60px', fontWeight: 'bold', paddingTop: '20px', paddingBottom: '-10px' }}>เพิ่มพนักงาน</p></Col>
            </Row>
            <Row justify="center">
                <Col span={22}><DividerStyled /></Col>
            </Row>
            <Row>
                <Col span={12} offset={5}><Form.Item><Input style={{ borderRadius: "24px", width: '100%', height: '47px', fontSize: '18px', background: '#fff', boxShadow: '0px 4px 4px rgb(0 0 0 / 25%)' }} /></Form.Item></Col>
                <Col span={3} offset={1}><ButtonStyledd icon={<SearchOutlined />} style={{ background: '#F1BE44', width: '150px' }}>Search</ButtonStyledd></Col>

                <Col span={3} offset={18} style={{ paddingTop: '40px' }}><ButtonStyledd onClick={() => setModal({ visible: true, header: "เพิ่มพนักงาน", status: "Adduser" })}
                    icon={<UserAddOutlined />} style={{ background: '#F1BE44', width: '150px' }}>Add User</ButtonStyledd></Col>
            </Row>
            <Row justify='center' style={{ width: "100%", marginTop: "10px" }}>

                <TableStyled style={{ width: "70%" }} dataSource={User} columns={columns} />
            </Row>
            {AddUserModal(modal, setModal, position,department, onAddUser)}
        </>
    );
};


const DividerStyled = styled(Divider)`
    background: #064595 ;
    height: 2px;
    margin-top: -50px;
`
const ButtonStyledd = styled(Button)`
    color: #064595;
    height: 50px;
    border-Radius:10px;
    font-Size: 18px;
    fontFamily: Semi Bold;
    font-weight: bold;
    
`

const TableStyled = styled(Table)`
    .ant-select-selector {
        border-radius: 10px !important;
    }

    .ant-table {
        border-radius: 30px;
    }

    .ant-table-tbody>tr>td {
        transition: background 0.3s;
        background: #DEE7F1;
        border-bottom: 2px solid white;
        font-size: 16px;
        font-weight: 900;
    }

    .ant-table-tbody>tr: last-child >td {
        border-bottom: none;
    }

    .ant-table-thead>tr>th {
        position: relative;
        color: white;
        background: #064595 !important;
        font-size: 18px;
        border-right: 1px solid white;
        border-left: 1px solid white;
    }

    .ant-table-tbody>tr>td {
        /* border-bottom: 1px solid #f0f0f0; */
        transition: background 0.3s;
        background: #DEE7F1;
        border-bottom: 2px solid white;
        border-right: 2px solid white;
        font-size: 16px;
        font-weight: 900;
    }

    .ant-table-tbody>tr: last-child >td {
        border-bottom: none;
    }

    .ant-table-tbody>tr >td : last-child{
        border-right: none;
    }
`
export default App;