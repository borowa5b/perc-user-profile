import axios from 'axios';
import { Component } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

export class LoginFormComponent extends Component {

    /**
     * Login form component constructor
     * @param {any} props
     */
    constructor(props) {
        super(props);
        this.state = {
            emailInputValue: null,
            passwordInputValue: null,
            showValidations: false
        }
    }

    /**
     * Logs the user in
     * @param {import('react').FormEvent<HTMLFormElement>} event
     */
    login(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3001/users/login',
            data: {
                email: this.state.emailInputValue,
                password: this.state.passwordInputValue
            },
            withCredentials: true
        })
            .then(() => {
                window.location.href = '/profile';
            })
            .catch(() => {
                // @ts-ignore
                document.querySelector('.login-alert').hidden = false;
            });
    }

    /**
     * Handles the form submission
     * @param {import('react').FormEvent<HTMLFormElement>} event The form submission event
     */
    handleSubmit(event) {
        /**
         * @type {HTMLFormElement} form
         */
        // @ts-ignore
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                showValidations: true
            });
        } else {
            this.setState({
                showValidations: true
            });
            this.login(event);
        }
    };

    /**
     * Renders login form component
     */
    render() {
        return (
            <div>
                <Alert className='login-alert' variant='danger' dismissible hidden onClose={() => {
                    // @ts-ignore
                    document.querySelector('.login-alert').hidden = true
                }}>Error occured. Please check your credentials and try again.</Alert>
                <h1>Log in</h1>
                <Form className='mt-3' noValidate validated={this.state.showValidations} onSubmit={event => this.handleSubmit(event)}>
                    <Form.Group className='mb-3' controlId='emailInput'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Email'
                            onChange={event => this.setState({ emailInputValue: event.target.value })}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please provide email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='passwordInput'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Password'
                            onChange={event => this.setState({ passwordInputValue: event.target.value })}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please provide password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant='primary' type='submit'>
                        Log in
                    </Button>
                </Form>
            </div>
        )
    }
}