import React, { Component } from 'react'
import { Checkbox } from 'antd';

export default class Question extends Component {

    handleChange = (e, choice) => {
        this.props.handleCheckbox(e.target.checked, choice);
    }

    render() {
        return (
            <div>
                <div>
                    <h3>{this.props.question.title}</h3>
                    {this.props.question.choices.map(choice =>   
                        <Checkbox key={choice} onChange={e => this.handleChange(e, choice)}>
                            {choice}
                        </Checkbox>
                    )}
                </div>
            </div>
        )
    }
}
