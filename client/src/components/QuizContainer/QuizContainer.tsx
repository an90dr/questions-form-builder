import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Empty, Row, Spin} from "antd";
import {EditOutlined, LoadingOutlined, SettingOutlined, UndoOutlined} from '@ant-design/icons';
import './QuizContainer.scss';
import axios from "axios";
import {IQuiz} from "../../interfaces/Quiz";
import QuizForm from "../QuizForm/QuizForm";
import {emptyQuiz} from "../../factory/QuizFactory";
import {addScreen, breadcrumbArray} from '../../features/breadcrumb/breadcrumbSlice';
import {useDispatch, useSelector} from "react-redux";
import {SCREEN_ITEMS} from "../../types/Constants";

interface IProps {

}

interface IQuizCardsProps {
    quizArray: IQuiz[]
}

interface IQuizResponse {
    data: IQuiz[]
}

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

const QuizContainer = (props: IProps) => {

    const [quizArray, setQuizArray] = useState<IQuiz[]>([]);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
    const [selectedQuiz, setSelectedQuiz] = useState<IQuiz>(emptyQuiz());
    const dispatch = useDispatch();
    const breadcrumbItems = useSelector(breadcrumbArray);

    useEffect(() => {
        getQuizzes();
    }, []);

    const getQuizzes = () => {
        setIsRefreshing(true);
        axios.get('http://localhost:3000/quiz')
            .then((response: IQuizResponse) => {
                setIsRefreshing(false);
                setQuizArray(response.data);
            });
    }

    const getActiveScreen = (): JSX.Element => {
        let activeScreen = breadcrumbItems[breadcrumbItems.length-1];

        if(activeScreen == SCREEN_ITEMS.MyQuestions) {
            return <QuizCards quizArray={quizArray}/>
        } else if(activeScreen == SCREEN_ITEMS.QuizForm) {
            return <QuizForm quiz={selectedQuiz}/>;
        }
        return <></>
    }

    const getRefreshButton = () => {
        return (<Col className="gutter-row" span={6}>
            <Button icon={<UndoOutlined/>}
                    loading={isRefreshing}
                    onClick={() => {
                        getQuizzes();
                    }}>
                Refresh
            </Button>
        </Col>);
    }


    const QuizCards = (props: IQuizCardsProps) => {

        const getCardActions = (quiz: IQuiz) => {
            return [
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" onClick={()=> {
                    dispatch(addScreen(SCREEN_ITEMS.QuizForm));
                    setSelectedQuiz(quiz);
                }} />
            ]
        }

        let quizCards = props.quizArray.map((quiz: IQuiz, index) => {

            return (
                <Col key={index} className="gutter-row" span={6}>
                    <Card
                        className='quiz-container-quiz-card'
                        title={quiz.header}
                        actions={getCardActions(quiz)}

                    >
                        <p>Creator: xxx</p>
                        <p>Date: xxx</p>
                        <p>Card content</p>
                    </Card>
                </Col>);

        });

        let quizElement: JSX.Element = <Row className='quiz-container-quiz-row' gutter={[32, 32]}>{quizCards}</Row>;

        if (isRefreshing) {
            quizElement = <div className='quiz-container-loading'>
                <Spin indicator={antIcon}/>
            </div>;
        } else if (quizCards.length == 0) {
            quizElement = <Empty/>;
        }

        return (
            <div className="site-card-wrapper">
                <Row className="actionRow" gutter={[32, 32]}>
                    {getRefreshButton()}
                </Row>

                {
                    quizElement
                }

            </div>
        );
    };

    return getActiveScreen();

}

export default QuizContainer;