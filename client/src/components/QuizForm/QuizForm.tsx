import React, {useEffect, useState} from 'react';
import './QuizForm.scss';
import {IAnswer, IQuiz} from "../../interfaces/Quiz";
import axios from "axios";
import {IForm, IFormResponse} from "../../interfaces/Form";
import {emptyQuiz} from "../../factory/QuizFactory";
import {emptyForm} from '../../factory/FormFactory';
import {Form, Input} from "antd";
import Question from "../Question/Question";
import {IQuestion, IQuestionResponse} from "../../interfaces/Questions";
import {emptyQuestion} from "../../factory/QuestionFactory";

interface IProps {
    quiz: IQuiz,
}
const { TextArea } = Input;


const QuizForm = (props: IProps) => {

    const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
    const [selectedForm, setFormData] = useState<IForm>(emptyForm());
    const [questions, setQuestions] = useState<IQuestion[]>([emptyQuestion()]);
    ///form

    useEffect(() => {
        getForm();
    }, []);

    const getForm = (): void => {
        setIsRefreshing(true);
        axios.get('http://localhost:3000/form?quizId=' + props.quiz._id,
            {
                params: {
                    'formId': props.quiz.form
                }
            })
            .then((formResponse: IFormResponse) => {
                setFormData(formResponse.data.form);
                setQuestions(formResponse.data.questions);
                setIsRefreshing(false);
            });

            /*
            axios.get<IQuestion[]>('http://localhost:3000/questions?quizId=' + props.quiz._id,
            {
                params: {
                    'formId': props.quiz.form
                }
            })
            .then((questionResponse: IQuestionResponse) => {

                setIsRefreshing(false);
            });
            */
    }

    return (
        <div style={{'marginTop': '50px'}}>
            <Form layout={'vertical'}>
                <Form.Item label={"Quiz Title"}>
                    <TextArea rows={2} size={"large"} />
                </Form.Item>
                <>
                {questions.map((question)=>{
                    return <Question key={question.question} question={question.question}></Question>
                })}
                </>
            </Form>
            {props.quiz.header}
        </div>
    );
}

export default QuizForm;
