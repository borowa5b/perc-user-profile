import axios from 'axios';
import { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import Moment from 'moment';
import Image from 'react-bootstrap/Image';

export class ProfileDataComponent extends Component {

    /**
     * Profile data component constructor
     * @param {any} props
     */
    constructor(props) {
        super(props);
        this.state = {
            userProfile: null,
            avatar: null
        };
    }

    /** 
     * Gets user profile after component is loaded (in order to use state)
     */
    componentDidMount() {
        this.getProfile();
    }

    /**
     * Gets user profile to display
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
            if (response.data.avatar) {
                this.setState({
                    avatar: 'http://localhost:3001/image/' + response.data.avatar
                });
            }
        }).catch((error) => {
            console.error('Unauthorized acces', error);
            window.location.href = '/login';
        });
    }

    /**
     * Renders profile component
     */
    render() {
        return (
            this.state.userProfile ? (
                <div>
                    <h1>Welcome</h1>
                    <div className='d-flex'>
                        <div className='col-9'>
                            Name: {this.state.userProfile.name} <br />
                            Surname: {this.state.userProfile.surname} <br />
                            Email: {this.state.userProfile.email} <br />
                            Account created at: {Moment(this.state.userProfile.createdAt).format('DD-MM-yyyy HH:ss')} <br />
                        </div>
                        {this.state.avatar ? (
                            <div className='col-3'>
                                <Image fluid src={this.state.avatar} />
                            </div>
                        ) : ''}
                    </div>
                </div>
            ) : (<Spinner animation='grow' />)
        );
    }
}