import { Component } from 'react';
import { RegistrationFormComponent } from './registration-form';
import { RegistrationHelpBoxComponent } from './registration-help-box';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

export class RegistrationComponent extends Component {

    /**
     * Registration component constructor
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
     * Renders registration component
     */
    render() {
        return (
            this.state.checkingIfLogged ? (<Spinner animation='grow' />) : (
                <div className='col-lg-6 d-flex flex-column flex-lg-row align-items-center justify-content-around'>
                    <div className='card col-lg-7 p-3 align-self-start'>
                        <RegistrationFormComponent />
                    </div>
                    <div className='mt-lg-0 mt-4 card col-lg-4 p-3 align-self-start'>
                        <RegistrationHelpBoxComponent />
                    </div>
                </div>
            )
        );
    }
}