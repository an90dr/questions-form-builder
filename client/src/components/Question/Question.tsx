import React, {useEffect, useState} from 'react';
import './Question.scss';
import {IQuiz} from "../../interfaces/Quiz";
import axios from "axios";
import {IForm, IFormResponse} from "../../interfaces/Form";
import {emptyQuiz} from "../../factory/QuizFactory";
import {emptyForm} from '../../factory/FormFactory';
import {Form, Input, Radio, Space} from "antd";

interface IProps {
}
const { TextArea } = Input;

const Question = (props: IProps) => {

    const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
    const [selectedForm, setFormData] = useState<IForm>(emptyForm());
    ///form

    /*useEffect(() => {
        getForm();
    }, []);*/

    const getForm = (): void => {
        /*setIsRefreshing(true);
        axios.get<IForm>('http://localhost:3000/form',
            {
                params: {
                    'formId': props.quiz.form
                }
            })
            .then((response: IFormResponse) => {

                setIsRefreshing(false);
                setFormData(response.data);
            });*/
    }

    return (
        <>
            <Form.Item label={"Question"}>
                <TextArea rows={2} size={"large"} placeholder={"Please Enter your Question"} />
            </Form.Item>

            <Radio.Group onChange={()=>{}} value={null}>
                <Space direction="vertical">
                    <Radio value={1}>Option A</Radio>
                    <Radio value={2}>Option B</Radio>
                    <Radio value={3}>Option C</Radio>
                    <Radio value={4}>Option D</Radio>
                </Space>
            </Radio.Group>
        </>
    );
}

export default Question;
