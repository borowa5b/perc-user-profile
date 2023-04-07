import { Component } from 'react';
import { LoginFormComponent } from './login-form';
import { LoginHelpBoxComponent } from './login-help-box';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

export class LoginComponent extends Component {

    /**
     * Login component constructor
     * @param {any} props
     */
    constructor(props) {
        super(props);
        this.checkIfAlreadyLogged();
        this.state = {
            checkingIfLogged: true
        }
    }


    /**
     * Checks if the user is already logged in, if yes redirects to the profile page
     */
    checkIfAlreadyLogged() {
        axios({
            method: 'get',
            url: 'http://localhost:3001/users/profile',
            withCredentials: true
        }).then((response) => {
            if (response.data) {
                window.location.href = '/profile';
            } else {
                this.setState({ checkingIfLogged: false });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    /**
     * Renders login form component
     */
    render() {
        return (
            this.state.checkingIfLogged ? (<Spinner animation='grow' />) : (
                <div className='col-lg-6 d-flex flex-column flex-lg-row align-items-center justify-content-around'>
                    <div className='card col-lg-7 p-3 align-self-start'>
                        <LoginFormComponent />
                    </div>
                    <div className='mt-lg-0 mt-4 card col-lg-4 p-3 align-self-start'>
                        <LoginHelpBoxComponent />
                    </div>
                </div>
            )
        );
    }
}