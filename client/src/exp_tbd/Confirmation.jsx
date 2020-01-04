// Confirmation.jsx
import React, { Component } from 'react';


class Confirmation extends Component{
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const {values: { firstName, lastName, email, age, city, country }} = this.props;

        return(
            <div>
                <h1 className="ui centered">Confirm your Details</h1>
                <p>Click Confirm if the following details have been correctly entered</p>
                <li>
                <ul>First Name: {firstName}</ul>
                </li>
                <li>
                <ul>First Name: {lastName}</ul>
                </li>
                <li>
                <ul>email: {email}</ul>
                </li>
                <li>
                <ul>age: {age}</ul>
                </li>
                <li>
                <ul>city: {city}</ul>
                </li>

                
                <button onClick={this.back}>Back</button>
                <button onClick={this.saveAndContinue}>Confirm</button>
            </div>
        )
    }
}

export default Confirmation;