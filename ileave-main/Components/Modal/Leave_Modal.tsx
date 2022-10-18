import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Form, Input, Select, Button, Divider, message, Upload, DatePicker, } from 'antd'
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import styled from 'styled-components'
import Layout from 'antd/lib/layout/layout';
interface IFormValue {
    name: string
    lastname: string
    user_id: string
    id?: string
    position: string
    department: string
    delete?: string
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt5M = file.size / 4096 / 4096 < 5;
    if (!isLt5M) {
        message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt5M;
};
const { RangePicker } = DatePicker;
const AddUserModal = (
    modal: any, setModal: any, position: any, department: any, onAddUser: any) => {

    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(1);
    const [userPosition, setUserPosition] = useState(position?.pos_id)
    const [userDepartment, setUserDepartment] = useState(department?.dep_id)
    const [imageUrl, setImageUrl] = useState<string>();
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const { Option } = Select;



    const [form] = Form.useForm();

    const onFinish = (values: IFormValue) => {
        form.resetFields()
        if (modal?.status === "add") {
          onAddUser(values)
          setModal({ value: values, visible: false })
        } else if (modal?.status === "edit") {
          onEditUser(values)
          setModal({ value: values, visible: false })
        } else if (modal?.status === "delete") {
          onDeleteUser(values?.delete)
          setModal({ visible: false })
        }
    
      }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const [dataStart, setdataStart] = useState({});
    const [dataEnd, setdataEnd] = useState({});
    const [detailInput, setdetailInput] = useState({});
    const [datas, setdatas] = useState([]);
    const onChangePosition: any = (value: string) => {
        console.log(`selected ${value}`)
        setUserPosition(value)
    }
    const onChangeDepartment: any = (value: string) => {
        console.log(`selected ${value}`)
        setUserDepartment(value)
    }
    const handleInputChange = (e: any) => {
        setdatas(e.target.value);
    };


    useEffect(() => {
        form.setFieldsValue({
            groupname: modal?.value?.group, //form.item > name="name"
            status: 1, //form.item > name="status"
        })
    }, [modal, setModal])

    const props: UploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    return (
        <ModalStyled
            visible={modal?.visible}
            footer={false}
            width={900}
            centered
            onCancel={() => setModal({ visible: false })}
            onOk={() => setModal({ visible: false })}>
            <Form>
                <Form.Item>
                    <Row>
                        <Col span={20} offset={0}
                            style={{ fontSize: '35px', fontWeight: 'bold' }}>{modal?.header}</Col>
                        <Col span={24}><DividerStyled /></Col>

                        {modal?.status === "Leave" ?
                            <>
                                <Col span={8} offset={2}>
                                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> ประเภทการลา</p>
                                    <SelectStyled showSearch size='large' optionFilterProp="children">
                                        <Option value="Laeve">ลากิจ</Option>
                                        <Option value="Sick-Leave">ลาป่วย</Option>
                                        <Option value="Leave-Other">อื่น ๆ</Option>
                                    </SelectStyled>
                                </Col>
                                <Col span={8} offset={4}>
                                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> จำนวนวันลา</p>
                                    <Form.Item>
                                        <InputStyled />
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={2}>
                                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '0px' }}> ลาจากวันที่</p>
                                    <Form.Item>
                                        <DatePickerStyled />
                                    </Form.Item>
                                </Col>

                                <Col span={8} offset={4}>
                                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '0px' }}> ถึงวันที่</p>
                                    <Form.Item>
                                        <DatePickerStyled />
                                    </Form.Item>
                                </Col>
                                <Col span={20} offset={2}>
                                    <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> สาเหตุการลา</p>
                                    <Form.Item>
                                        <Input.TextArea name="detailInput" autoSize={{ minRows: 4, maxRows: 6 }}
                                            style={{ borderRadius: "20px", width: '100%', height: '50px', fontSize: '16px', background: '#FFF', borderColor: '#BFBFBF', marginTop: '-10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={6} offset={2}>
                                    <Upload {...props}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Col>

                            </>

                            : modal?.status === "WFH" ?
                                <>
                                    <Col span={20} offset={2}>
                                        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> วันที่</p>
                                        <Form.Item>
                                            <InputStyled style={{ width: '100%' }} /></Form.Item>
                                    </Col>
                                    <Col span={8} offset={2}>
                                        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> ชื่อ</p>
                                        <Form.Item>
                                            <InputStyled style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={4}>
                                        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> นามสกุล</p>
                                        <Form.Item>
                                            <InputStyled style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={2}>
                                        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> ตำแหน่ง</p>
                                        <Form.Item>
                                            <InputStyled style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={4}>
                                        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> แผนก</p>
                                        <Form.Item>
                                            <InputStyled style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={20} offset={2}>
                                        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> เริ่มปฏิบัตงานวันที่</p>
                                        <Form.Item>
                                            <InputStyled style={{ width: '100%' }} /></Form.Item>
                                    </Col>
                                    <Col span={20} offset={2}>
                                        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> มีความประสงค์ชี้แจง / ให้ข้อมูล และอื่น ๆ (โปรดระบุคำร้องให้ครบถ้วน)</p>
                                        <Form.Item>
                                            <Input.TextArea name="detailInput" autoSize={{ minRows: 5, maxRows: 8 }}
                                                style={{ borderRadius: "20px", width: '100%', height: '50px', fontSize: '16px', background: '#FFF', borderColor: '#BFBFBF', marginTop: '-10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }} />
                                        </Form.Item>
                                    </Col>
                                </>
                                : modal?.status === "RTO" ?
                                    <>
                                        <Col span={1} offset={3}>
                                            <UploadStyled
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                beforeUpload={beforeUpload}
                                                onChange={handleChange}
                                            >
                                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                            </UploadStyled>
                                        </Col>
                                        <Col span={10} offset={7} >
                                            <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595' }}>วันที่เริ่มต้น</p>
                                            <DatePickerStyled
                                                name="dataStart"
                                            />
                                            <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}>วันที่สิ้นสุด</p>
                                            <DatePickerStyled
                                                name="dataEnd"
                                            />
                                        </Col>
                                        <Col span={20} offset={2}>
                                            <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}>รายละเอียด</p>
                                            <Form.Item>
                                                <Input.TextArea
                                                    name="detailInput"
                                                    autoSize={{ minRows: 3, maxRows: 6 }}
                                                    style={{ borderRadius: "20px", width: '100%', height: '60px', fontSize: '22px', background: '#FFF', borderColor: '#BFBFBF', marginTop: '-10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }} /></Form.Item>
                                        </Col>
                                    </>
                                    : modal?.status === "Adduser" ?
                                        <>
                                            <Col span={20} offset={2}>
                                                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}>รหัสพนักงาน</p>
                                                <Form.Item name='user_id'>
                                                    <InputStyled style={{ width: '100%' }} /></Form.Item>
                                            </Col>
                                            <Col span={8} offset={2}>
                                                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> ชื่อ</p>
                                                <Form.Item name='name'>
                                                    <InputStyled style={{ width: "100%" }} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8} offset={3}>
                                                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> นามสกุล</p>
                                                <Form.Item name='lastname'>
                                                    <InputStyled style={{ width: "100%" }} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8} offset={2}>
                                                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> ตำแหน่ง</p>
                                                <SelectStyled
                                                    showSearch
                                                    size="large"
                                                    placeholder=""
                                                    onChange={onChangePosition}
                                                    optionFilterProp="children"
                                                    disabled={modal?.status === "detail" && true}
                                                    filterOption={(input, option) =>
                                                        (option!.children as unknown as string)
                                                            .toLowerCase()
                                                            .includes(input.toLowerCase())
                                                    }
                                                >
                                                    {position !== undefined &&
                                                        position?.map((value: any, index: number) => (
                                                            <Option key={index} value={value?.pos_id}>
                                                                {value?.pos_name}
                                                            </Option>
                                                        ))}
                                                </SelectStyled>
                                            </Col>
                                            <Col span={8} offset={3}>
                                                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#064595', paddingTop: '10px' }}> แผนก</p>
                                                <SelectStyled
                                                    showSearch
                                                    size="large"
                                                    placeholder=""
                                                    onChange={onChangeDepartment}
                                                    optionFilterProp="children"
                                                    disabled={modal?.status === "detail" && true}
                                                    filterOption={(input, option) =>
                                                        (option!.children as unknown as string)
                                                            .toLowerCase()
                                                            .includes(input.toLowerCase())
                                                    }
                                                >
                                                    {department !== undefined &&
                                                        department?.map((value: any, index: number) => (
                                                            <Option key={index} value={value?.dep_id}>
                                                                {value?.dep_name}
                                                            </Option>
                                                        ))}
                                                </SelectStyled>
                                            </Col>
                                        </>
                                        : null
                        }

                    </Row>
                </Form.Item>
            </Form>
            <Row justify="center">
                <Col span={4} offset={12}>
                    <ButtonStyledd onClick={() => setModal({ visible: false })}
                        style={{ background: '#BFBFBF' }}>ยกเลิก</ButtonStyledd>
                </Col>
                <Col span={4} offset={1}>
                    <ButtonStyledd
                        onClick={() => {
                            setModal({ visible: false })
                            form.resetFields()
                        }}
                        htmlType="submit"
                        style={{ width: "100%" }}
                    >
                        Submit
                    </ButtonStyledd>
                </Col>
            </Row>
        </ModalStyled>
    )

}
const InputStyled = styled(Input)`
    border-radius: 16px;
    width: 40%;
    height: 40px;
    font-size: 16px;
    background: rgb(255, 255, 255);
    border-color: rgb(191, 191, 191);
    margin-top: -10px;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 10%);
`
const SelectStyled = styled(Select)`
    width: 100%;
    margin-Top: -10px;
    .ant-select-selector {
        border-radius: 14px !important;
        border-color: #BFBFBF !important;
      } 
`
const ButtonStyledd = styled(Button)`
    color: #064595;
    height: 40px;
    border-Radius:10px;
    font-Size: 16px;
    fontFamily: Semi Bold;
    font-weight: bold;
    width: 100%;
    
`
const DatePickerStyled = styled(DatePicker)`
    width: 100% ;
    border-Color: #BFBFBF;
    height: 50px;
    border-Radius: 14px;
    background: #FFF;
    margin-Top: -10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`
const DividerStyled = styled(Divider)`
    background: #064595 ;
    height: 2px;
    margin-top: 0px;
    width: 100%;
`
const ModalStyled = styled(Modal)`
    .ant-modal-content {
        border-radius: 46px;
        padding: 30px;
    }

    .ant-modal-close {
        margin-top: 20px;
        margin-right: 30px;
    }

    .ant-modal-close-x {
        font-size: 22px;
    }
`
const UploadStyled = styled(Upload)`
.ant-upload.ant-upload-select-picture-card {
    width: 200px;
    height: 200px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
    vertical-align: top;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 15px;
    cursor: pointer;
    transition: border-color 0.3s;
}
`
export default AddUserModal