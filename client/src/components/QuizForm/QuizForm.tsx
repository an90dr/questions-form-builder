import React, {useEffect, useState} from 'react';
import './QuizForm.scss';
import {IQuiz} from "../../interfaces/Quiz";
import axios from "axios";
import {IForm, IFormResponse} from "../../interfaces/Form";
import {emptyQuiz} from "../../factory/QuizFactory";
import {emptyForm} from '../../factory/FormFactory';
import {Form, Input} from "antd";
import Question from "../Question/Question";

interface IProps {
    quiz: IQuiz,
}
const { TextArea } = Input;

const QuizForm = (props: IProps) => {

    const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
    const [selectedForm, setFormData] = useState<IForm>(emptyForm());
    ///form

    useEffect(() => {
        getForm();
    }, []);

    const getForm = (): void => {
        setIsRefreshing(true);
        axios.get<IForm>('http://localhost:3000/form',
            {
                params: {
                    'formId': props.quiz.form
                }
            })
            .then((response: IFormResponse) => {

                setIsRefreshing(false);
                setFormData(response.data);
            });
    }

    return (
        <div style={{'marginTop': '50px'}}>
            <Form layout={'vertical'}>
                <Form.Item label={"Quiz Title"}>
                    <TextArea rows={2} size={"large"} />
                </Form.Item>

                <Question/>
            </Form>
            {props.quiz.header}
        </div>
    );
}

export default QuizForm;
