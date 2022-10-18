import React, { useState} from 'react';
import styled from 'styled-components';
import NavbarHead from '../Components/Layout/Navbar'
import LeaveModal from '../Components/Modal/Leave_Modal'
import PrintLeave from '../Components/Modal/Print_Leave'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Button, Form, Row, Col, Divider, DatePicker, Table, Switch, Space } from 'antd';
import { SearchOutlined, DiffOutlined, FormOutlined, DeleteFilled, PrinterOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const App: React.FC = () => {
    const [modal, setModal] = useState({})
    const [modalprint, setModalprint] = useState({})
    const [newdataStart, setnewdataStart] = useState({})

    const onChangeStatus = (checked: boolean) => {
        console.log(`switch to ${checked}`);
        // setStatus(checked)
    };

    const dataSource = [
        {
            Data: '1/01/2222',
            Start_Data: '06/06/6666',
            End_Data: '99/99/9999',
            LeaveType:'ลากิจ',
            Detail: '9VS8',
            Number: '',
            status: 'อนุมัติ',
        },
        {
            Data: '1/01/2222',
            Start_Data: '00/00/0000',
            End_Data: '99/99/9999',
            LeaveType:'ลาป่วย',
            Detail: 'PumiPol Sniper',
            Number: '',
            status: 'ไม่อนุมัติ',
        },
        {
            Data: '1/01/2222',
            Start_Data: '00/00/0000',
            End_Data: '99/99/9999',
            LeaveType:'อื่นๆ',
            Detail: 'LOL',
            Number: '',
            status: 'อนุมัติ',
        },

    ];
    const columns: any = [
        {
            title: 'วันที่',
            dataIndex: 'Data',
            key: 'Data',
            align: 'center',
        },
        {
            title: 'เริ่มต้น',
            dataIndex: 'Start_Data',
            key: 'Start_Data',
            align: 'center',
        },
        {
            title: 'สิ้นสุด',
            dataIndex: 'End_Data',
            key: 'End_Datao',
            align: 'center',
        },
        {
            title: 'ประเภทการลา',
            dataIndex: 'LeaveType',
            key:'LeaveType',
            align: 'center',
        },
        {
            title: 'รายละเอียด',
            dataIndex: 'Detail',
            key: 'Detail',
            align: 'center',
        },
        {
            title: 'จำนวนวันลา',
            dataIndex: 'Number',
            key: 'Number',
            align: 'center',
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            
        },
        {
            title: 'การจัดการ',
            dataIndex: 'management',
            key: 'management',
            align: 'center',
            width: '10%',
            render: (_: any, record: any) => (
                <Row justify='center' gutter={0} style={{ width: "100%" }}>
                    <Col span={4} offset={2} style={{marginRight:"40px",}}>
                        <Button 
                        onClick={() => setModalprint({visible: true, header: "ใบลากิจ",status: "Leave", id: "ToPrint"}
                            
                        )}
                        style={{background: 'none',border:'none' }} >
                            <PrinterOutlined style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: "#064595" }} />
                        </Button>
                    </Col>
                    <Col span={4} offset={2} style={{marginRight:"40px",}}>
                        <Button 

                        style={{background: 'none',border:'none' }} >
                            <PrinterOutlined style={{ fontSize: "24px", fontFamily: "SukhumvitSet-Bold", color: "#064595" }} />
                        </Button>
                    </Col>
                </Row>
                
            ),
        },
    ];
    // const downloadPdf = () => {
    //     const input: any = document.getElementById ('paf-container');
    //     html2canvas(input,{
    //         allowTaint: true,
    //         useCORS: true,
    //         scale: 2
    //     })
    //     .then((canvas) => {
    //         const imgData: any = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF();
    //         pdf.addImage(imgData, 'PNG',0,0,203,0);
    //         pdf.save(`invoice-ref${modalprint?.status?.data?.reference}.pdf`)
    //     })
    // }
    // html2canvas(document.body).then(function(canvas) {
    //     document.body.appendChild(canvas);
    // });

    const printDocument = () => {
        const input: any = document.getElementById('ToPrint');
        html2canvas(input)
      .then((canvas) => {
        let imgWidth = 208;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
    }
    return (
        <>
            <NavbarHead />

            <Row>
                <Col span={20} offset={2}><p style={{ fontSize: '60px', fontWeight: 'bold', paddingTop: '20px', paddingBottom: '-10px',color: '#2D2A96' }}>ลางาน</p></Col>
            </Row>
            <Row justify="center">
                <Col span={22}><DividerStyled /></Col>
            </Row>
            <Row justify="center">
                <Col span={12} >
                    <Form.Item><DatePickerStyled /><ArrowRightOutlinedStyled /><DatePickerStyled /></Form.Item></Col>
                <Col span={3} offset={1}><ButtonStyledd icon={<SearchOutlined />} style={{ background: '#F1BE44', width: '150px' }}>Search</ButtonStyledd></Col>
            </Row>
            <Row>
                <Col span={15} offset={2}><p style={{ fontSize: '60px', fontWeight: 'bold', paddingTop: '30px',color: '#2D2A96'}}>ประวัติการลา</p></Col>
                <Col span={3} offset={2}><ButtonStyledd onClick={() => setModal({visible: true ,header: "เพิ่มการลา",status: "Leave"})}
                icon={<DiffOutlined />} style={{ background: '#F1BE44', width: '65%', marginTop: '60px' }}>เพิ่มการลา</ButtonStyledd></Col>
            </Row>
            <Row>
                <Col span={22} offset={1}><DividerStyledd /></Col>
                <ColText span={2} offset={6}> วันลาป่วยคงเหลือ</ColText>
                <ColText span={1} offset={0} style={{border:'2px solid #FFCA18',textAlign:'center',borderRadius:'10px',backgroundColor:'#FFCA18'}}> 7/30</ColText>
                <ColText span={2} offset={1}> วันลาป่วยคงเหลือ  </ColText>
                <ColText span={1} offset={0} style={{border:'2px solid #FFCA18',textAlign:'center',borderRadius:'10px',backgroundColor:'#FFCA18'}}> 7/30</ColText>
                <ColText span={2} offset={1}> วันลาป่วยคงเหลือ  </ColText>
                <ColText span={1} offset={0} style={{border:'2px solid #FFCA18',textAlign:'center',borderRadius:'10px',backgroundColor:'#FFCA18'}}> 7/30</ColText>
                
            </Row>
            <Row justify='center' style={{ width: "100%", marginTop: "50px" }}>
                <TableStyled style={{ width: "70%" }} dataSource={dataSource} columns={columns} />
            </Row>
            {/* {LeaveModal(modal, setModal)} */}
            {PrintLeave(modalprint, setModalprint)}
            
        </>
    );
};
const ColStyledFont = styled(Col)`
    font-Size: 18px;
    color: #000;
    text-Align:left;
    margin-Top:20px;
    font-family:THSarabun ;
`
const ColText = styled(Col)`
    font-size: 24px;
    font-weight: 800;
    line-height: 34px;
    letter-spacing: 0em;
    text-align: left;
    color: #2D2A96;
`
const ArrowRightOutlinedStyled = styled(ArrowRightOutlined)`
    width: 10% ;
`
const DatePickerStyled = styled(DatePicker)`
    width: 45% ;
    border-Color: #BFBFBF;
    height: 50px;
    border-Radius: 20px;
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const DividerStyled = styled(Divider)`
    background: #064595 ;
    height: 2px;
    margin-top: -50px;
`
const DividerStyledd = styled(Divider)`
    background: #064595 ;
    height: 2px;
    margin-top: -60px;
`
const ButtonStyledd = styled(Button)`
    color: #064595;
    height: 50px;
    border-Radius:15px;
    font-Size: 22px;
    fontFamily: Semi Bold;
    font-weight: bold;
    padding-top: 10px;
    
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
        font-size: 20px;
        font-weight: 900;
    }

    .ant-table-tbody>tr: last-child >td {
        border-bottom: none;
    }

    .ant-table-thead>tr>th {
        position: relative;
        color: white;
        background: #064595 !important;
        font-size: 22px;
        border-right: 1px solid white;
        border-left: 1px solid white;
    }

    .ant-table-tbody>tr>td {
        /* border-bottom: 1px solid #f0f0f0; */
        transition: background 0.3s;
        background: #DEE7F1;
        border-bottom: 2px solid white;
        border-right: 2px solid white;
        font-size: 20px;
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