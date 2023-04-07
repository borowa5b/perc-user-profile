import axios from 'axios';
import { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class EditProfileHelpBoxComponent extends Component {

    /** 
     * Loggs the user out
    */
    logout() {
        axios({
            method: 'post',
            url: 'http://localhost:3001/users/logout',
            withCredentials: true
        });
    }

    /** 
     * Renders edit profile help box component
     */
    render() {
        return (
            <div>
                <h5>What can I do?</h5>
                <hr />
                <ListGroup>
                    <ListGroup.Item>
                        Return to <Link to='/profile'>profile</Link>.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Link aria-describedby='Logout link' to='/' onClick={() => this.logout()}>Log out</Link>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}