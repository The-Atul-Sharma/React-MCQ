import React, { Component } from 'react'

export default class Answer extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.question.title}</h2>
                <p> Correct Answer : {this.props.question.correctAnswer.join(',')}</p>
                <p> Selected Answer : {this.props.selectedAnswer[this.props.questionIndex].join(',')}</p>
            </div>
        )
    }
}
