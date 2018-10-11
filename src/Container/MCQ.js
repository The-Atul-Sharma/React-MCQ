import React, { Component } from 'react'
import { Layout } from 'antd';
import { Button, Icon } from 'antd';

import Question from '../Component/Question';
import Answer from '../Component/Answer';
import questions from '../assets/questions';

import 'antd/dist/antd.css';  
import './MCQ.css';

const { Header, Content } = Layout;

let selectedAnswer = {};
questions.forEach((question, index) => { selectedAnswer[index] = [] });

export default class MCQ extends Component {
    constructor(props) {
		super(props);
		this.state = {
			currentIndex: 0,
            currentQuestion: questions[0],
            isSubmit: false,
            totalCorrectAnswers: 0
		};
	}

	submitQuiz = () => {
        let correctAnswer = 0;
		questions.forEach((question, index) => {
			if(question.correctAnswer.sort().join(',') === selectedAnswer[index].sort().join(',')) { 
				correctAnswer = correctAnswer + 1;
			}
        });

        this.setState({
            isSubmit: true,
            totalCorrectAnswers: correctAnswer,
        });
	}

	updateQuestion = () => {
		let { currentIndex } = this.state;

		let newCurrentIndex = currentIndex + 1;
		let newCurrentQuestion = questions[newCurrentIndex];

		this.setState({
			currentIndex: newCurrentIndex,
			currentQuestion: newCurrentQuestion,
		});
	}

	handleCheckbox = (checked, choice) => {
		let selectedChoiceList = [];
		if (checked) {
			selectedAnswer[this.state.currentIndex] ? selectedChoiceList = selectedAnswer[this.state.currentIndex] : selectedChoiceList = [];
			selectedChoiceList.push(choice);
			selectedAnswer[this.state.currentIndex] = selectedChoiceList;
		} else {
			let index = selectedAnswer[this.state.currentIndex].findIndex(option => option === choice);
			selectedAnswer[this.state.currentIndex].splice(index, 1); 
		}
	}

	render() {
		return (
			<div className="center">
                <Header>
                    <h1 className="white">MCQ Quiz</h1>
                </Header>
				{ !this.state.isSubmit ? ( <Content>
                        <Question question={this.state.currentQuestion} handleCheckbox={this.handleCheckbox} />
                        <div className="quiz-action">
                            <Button type="default" size="default" onClick={this.submitQuiz}>Submit</Button>
                            {(this.state.currentIndex < questions.length - 1) && <Button type="default" 	size="default" onClick={this.updateQuestion}>
                                <Icon type="right" />
                            </Button> }
                        </div>
                    </Content> ) : 
                    (<div>
                        {questions.map((question, index) =>   
                            <Answer questionIndex={index} question={question} selectedAnswer={selectedAnswer} />
                        )}
                        <div>
                            <b>{this.state.totalCorrectAnswers} out of {questions.length} are correct.</b>
                        </div> 
                    </div>)
                }
			</div>
		);
	}
}
