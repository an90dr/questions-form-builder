import React, {useEffect} from 'react';
import {Button, Checkbox, Form, Input, message} from 'antd';
import './Login.scss';
import { UserOutlined } from '@ant-design/icons';
import {Avatar} from 'antd';
import axios, {AxiosResponse} from "axios";
import {IUser} from "../../interfaces/User";
import { SERVER_STATUS } from '../../types/Constants';

interface IProps {
    successLogin?: any,
    failedLogin?: any
}

function Login(props: IProps) {


    useEffect(() => {

    }, [])

    function onFinish(formData: any){

        axios.get<IUser>(
            'http://localhost:3000/login',
            {
                    params: {
                            'username': formData.username,
                            'password': formData.password
                    }
                }
            ).then(
            (response: AxiosResponse) => {

                if(response.status != SERVER_STATUS.success){
                    props.failedLogin && props?.failedLogin(response);
                    message.error(  'Username Password combination not matched. Please try again.');
                }

                let UserProfile: IUser = response.data;
                props.successLogin && props?.successLogin(UserProfile);

            },
            (error: AxiosResponse) => {
                if(error.status != SERVER_STATUS.success){
                    props.failedLogin && props.failedLogin(error);
                    message.error(  'Username Password combination not matched. Please try again.');
                }
            }
        );
    }

    return (
        <div className="Login">
            <Form
                name="basic"
                layout={'vertical'}
                initialValues={{ remember: true }}
                onFinish={(data)=>{onFinish(data)}}
                autoComplete="off"
            >
                <div className={'avatarContainer'}>
                    <Avatar size={64} icon={<UserOutlined />} />
                </div>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <Button onClick={()=>{onFinish({username: 'andreash', password: 'Complex1'})}}>andreash</Button>
            <Button onClick={()=>{onFinish({username: 'user1', password: '123'})}}>User 1</Button>

        </div>
    );
}

export default Login;
