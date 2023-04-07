import { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class LoginHelpBoxComponent extends Component {

    /**
     * Renders login help box component
     */
    render() {
        return (
            <div>
                <h5>What can I do?</h5>
                <hr />
                <ListGroup>
                    <ListGroup.Item>
                        <div className='ms-2 me-auto'>
                            <div className='fw-bold'>If you have an account</div>
                            Please fill all the fields, then press login button.
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='ms-2 me-auto'>
                            <div className='fw-bold'>If you do not have an account</div>
                            Please <Link aria-describedby='Register link' to={'/register'}>register</Link>.
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}