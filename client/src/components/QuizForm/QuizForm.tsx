import React from 'react';
import './QuizForm.scss';
import {IQuiz} from "../../interfaces/Quiz";

interface IProps {
    quiz: IQuiz,
}

const QuizForm = (props: IProps) => {


    return (
        <div style={{'marginTop':'50px'}}>
            {props.quiz.header}
        </div>
    );
}

export default QuizForm;
