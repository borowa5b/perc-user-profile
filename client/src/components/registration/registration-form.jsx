import axios from 'axios';
import { Component } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

export class RegistrationFormComponent extends Component {

    /**
     * Registration form component constructor
     * @param {any} props
     */
    constructor(props) {
        super(props);
        this.state = {
            emailInputValue: '',
            passwordInputValue: '',
            confirmPasswordInputValue: '',
            nameInputValue: '',
            surnameInputValue: '',
            showValidations: false
        }
    }

    /**
     * Registers a new user
     * @param {import('react').FormEvent<HTMLFormElement>} event
     */
    register(event) {
        event.preventDefault();
        axios({
            method: 'put',
            url: 'http://localhost:3001/users/register',
            data: {
                email: this.state.emailInputValue,
                password: this.state.passwordInputValue,
                name: this.state.nameInputValue,
                surname: this.state.surnameInputValue,
            },
            withCredentials: true
        })
            .then(() => window.location.href = '/login')
            .catch(() => {
                // @ts-ignore
                document.querySelector('.registration-alert').hidden = false;
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
                showValidations: false
            });
            this.register(event);
        }
    };

    /**
     * Renders registration form component
     */
    render() {
        return (
            <div>
                <Alert className='registration-alert' variant='danger' dismissible hidden onClose={() => {
                    // @ts-ignore
                    document.querySelector('.registration-alert').hidden = true
                }}>Error occured. User with given email already exists.</Alert>
                <h1>Register</h1>
                <Form className='mt-3' noValidate validated={this.state.showValidations} onSubmit={event => this.handleSubmit(event)}>
                    <Form.Group className='mb-3' controlId='emailInput'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Email'
                            aria-describedby='Enter email here'
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
                            aria-describedby='Enter password here'
                            minLength={8}
                            onChange={event => this.setState({ passwordInputValue: event.target.value })}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please provide password with minimum 8 characters.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='nameInput'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Name'
                            aria-describedby='Enter your name here'
                            minLength={3}
                            onChange={event => this.setState({ nameInputValue: event.target.value })}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please provide name with minimum 3 characters.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='surnameInput'>
                        <Form.Label>Surname</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Surname'
                            aria-describedby='Enter your surname here'
                            minLength={5}
                            onChange={event => this.setState({ surnameInputValue: event.target.value })}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Please provide surname with minimum 5 characters.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='acceptTermsCheckbox'>
                        <Form.Check
                            required
                            type='checkbox'
                            label='Agree to terms and conditions'
                            feedback='You must agree before registering.'
                            feedbackType='invalid'
                            aria-describedby='Accept terms and conditions by clicking here'
                        />
                    </Form.Group>

                    <Button
                        aria-describedby='Click to register'
                        variant='primary'
                        type='submit'
                    >
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}