import { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class RegistrationHelpBoxComponent extends Component {

    /**
     * Renders registration help box
     */
    render() {
        return (
            <div>
                <h5>What can I do?</h5>
                <hr />
                <ListGroup>
                    <ListGroup.Item>
                        <div className='ms-2 me-auto'>
                            <div className='fw-bold'>If you do not have an account</div>
                            Please fill all the fields, accept terms and click register.
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='ms-2 me-auto'>
                            <div className='fw-bold'>If you have an account</div>
                            Please <Link aria-describedby='Login page link' to={'/login'}>log in</Link>.
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}