import axios from 'axios';
import { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ProfileHelpBoxComponent extends Component {

    /**
     * Loggs the use out
     */
    logout() {
        axios({
            method: 'post',
            url: 'http://localhost:3001/users/logout',
            withCredentials: true
        });
    }

    /**
     * Renders user profile help box component
     */
    render() {
        return (
            <div>
                <h5>What can I do?</h5>
                <hr />
                <ListGroup>
                    <ListGroup.Item>
                        <Link aria-describedby='Edit profile link' to='/profile/edit'>Edit data</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Link aria-describedby='Logout link' to='/' onClick={() => this.logout()}>Log out</Link>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}