import React, {useEffect, useState} from 'react';
import './Question.scss';
import {IAnswer, IQuiz} from "../../interfaces/Quiz";
import axios from "axios";
import {IForm, IFormResponse} from "../../interfaces/Form";
import {emptyQuiz} from "../../factory/QuizFactory";
import {emptyForm} from '../../factory/FormFactory';
import {Button, Form, Input, Radio, RadioChangeEvent, Space} from "antd";
import {CloseOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';

interface IProps {
    question: string
}

const {TextArea} = Input;

const Question = (props: IProps) => {

    const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
    const [selectedForm, setFormData] = useState<IForm>(emptyForm());
    const [radioGroupBtnValue, setRadioGroupBtnValue] = useState<number>(1);
    const [answerList, setAnswerList] = useState<IAnswer[]>([]);
    const [question, setQuestion] = useState<string>(props.question);

    useEffect(() => {

           const handleProps = () => {
              if (props.question) {
                  setQuestion(props.question);
              } else {
                //alert(props.question);
              }
            };

        handleProps();
        return () => {
            handleProps();
        }

    }, [props.question])

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

    const onChange = (e: RadioChangeEvent) => {
        setRadioGroupBtnValue(e.target.value);
    };

    const renderRadioButtons = () => {
        return answerList.map((answer: IAnswer, index) => {
            return (
                <>
                    <Radio
                        value={answer.radioValue}
                        checked={false}
                    >
                        <div className={'answerContainer'}>
                            <Input
                                type={"text"}
                                bordered={false}
                                className={"answer"}
                                value={answer.value}
                                onChange={(event) => {
                                    let answerListClone = structuredClone(answerList);
                                    answerListClone[index].value = event.target.value;
                                    setAnswerList(answerListClone);
                                }}
                            />

                            <CloseOutlined
                                className={'deleteIcon'}
                                onClick={(event) => {
                                    let answerListClone = structuredClone(answerList);
                                    answerListClone.splice(index, 1);
                                    setAnswerList(answerListClone);
                                }}
                            />
                        </div>
                    </Radio>

                </>
            );

        });
    };

    return (
        <>
            <Form.Item label={"Question"}>
                <TextArea
                    rows={2}
                    size={"large"}
                    placeholder={"Please Enter your Question"}
                    value={question}
                    onChange={(e)=>{ setQuestion(e.target.value)}}
                />
            </Form.Item>

            <Radio.Group onChange={onChange} value={radioGroupBtnValue} className={"answerGroup"}>
                <Space direction="vertical">
                    <>
                        {
                            renderRadioButtons()
                        }
                    </>
                    <Button
                        name={'addAnswer'}
                        onClick={() => {
                            let nextRadioValue = 1;
                            let answerListClone = structuredClone(answerList);

                            if (answerListClone.length > 0) {
                                nextRadioValue = answerListClone[answerListClone.length - 1].radioValue + 1;
                            }

                            answerListClone.push({radioValue: nextRadioValue, value: ''});
                            setAnswerList(answerListClone);

                        }} icon={<PlusOutlined/>}/>
                </Space>
            </Radio.Group>
        </>
    );
}

export default Question;
