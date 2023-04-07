import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

export class EditProfileDataComponent extends Component {
    hiddenAvatarInput;
    fileReader;

    /**
     * Edit profile data component constructor
     * @param {any} props
     */
    constructor(props) {
        super(props);
        this.state = {
            userProfile: null,
            emailInputValue: null,
            passwordInputValue: null,
            nameInputValue: null,
            surnameInputValue: null,
            uploadedAvatar: null,
            showValidations: false
        };
        this.hiddenAvatarInput = React.createRef();
        this.fileReader = new FileReader();
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
            this.editData(event);
        }
    };

    /** 
     * Gets user profile after component is loaded (in order to use state)
     */
    componentDidMount() {
        this.getProfile();
    }

    /**
     * Gets user profile to edit
     */
    getProfile() {
        axios({
            method: 'get',
            url: 'http://localhost:3001/users/profile',
            withCredentials: true
        }).then((response) => {
            if (!response.data) {
                window.location.href = '/login';
            }
            this.setState({ userProfile: response.data });
        }).catch((error) => {
            console.error(error);
            window.location.href = '/login';
        });
    }

    /**
     * Edits user data
     * @param {React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>} event
     */
    editData(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3001/users/profile/edit',
            data: {
                password: this.state.passwordInputValue,
                name: this.state.nameInputValue,
                surname: this.state.surnameInputValue,
                avatar: this.state.uploadedAvatar?.data
            },
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                window.location.href = '/profile';
            })
            .catch((error) => {
                console.error(error);
            });

    }

    /**
     * Handles user avatar file change
     * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event
     */
    handleAvatarFileChange(event) {
        const fileUploaded = event.target.files[0];
        if (!fileUploaded) {
            return;
        }

        this.fileReader.readAsArrayBuffer(fileUploaded);
        this.fileReader.onloadend = () => {
            this.setState({
                uploadedAvatar: {
                    fileName: fileUploaded.name,
                    data: new Blob([this.fileReader.result], { type: fileUploaded.type })
                }
            });
        }
    }

    /**
     * Shows file picker on upload button click
     */
    handleUploadButtonClick() {
        this.hiddenAvatarInput.current.click();
    }

    /**
     * Renders edit data component
     */
    render() {
        return (
            this.state.userProfile ? (
                <div>
                    <h1>Edit your data</h1>
                    <Form.Text className='muted'>Empty and not edited fields will be not updated</Form.Text>

                    <Form className='mt-3' noValidate validated={this.state.showValidations} onSubmit={event => this.handleSubmit(event)}>
                        <Form.Group className='mb-3' controlId='emailInput'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Email'
                                defaultValue={this.state.userProfile.email}
                                disabled
                                aria-describedby='Shows emails'
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='passwordInput'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                minLength={8}
                                aria-describedby='Enter password here'
                                onChange={event => this.setState({ passwordInputValue: event.target.value })}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please provide password with minimum 8 characters.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='nameInput'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Name'
                                defaultValue={this.state.userProfile.name}
                                aria-describedby='Enter name here'
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
                                type='text'
                                placeholder='Surname'
                                defaultValue={this.state.userProfile.surname}
                                aria-describedby='Enter surname here'
                                minLength={5}
                                onChange={event => this.setState({ surnameInputValue: event.target.value })}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please provide surname with minimum 5 characters.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='avatInput'>
                            <Form.Label>Avatar&nbsp;</Form.Label>
                            <Button
                                variant={this.state.uploadedAvatar ? 'outline-success' : 'outline-primary'}
                                type='button'
                                aria-describedby='Click to select user avatar'
                                onClick={() => this.handleUploadButtonClick()}
                            >
                                {this.state.uploadedAvatar ? this.state.uploadedAvatar.fileName.substring(0, 16) + '...' : 'Upload'}
                            </Button>
                            <Form.Control type='file'
                                ref={this.hiddenAvatarInput}
                                onChange={event => this.handleAvatarFileChange(event)}
                                accept='image/*'
                                hidden
                            />
                        </Form.Group>

                        <Button 
                        variant='primary' 
                        type='submit'
                        aria-describedby='Confirm user edit here'
                        >
                            Save
                        </Button>
                    </Form>
                </div>
            ) : (<Spinner animation='grow' />)
        );
    }
}