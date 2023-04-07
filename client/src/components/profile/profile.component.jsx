import { Component } from 'react';
import { ProfileDataComponent } from './profile-data';
import { ProfileHelpBoxComponent } from './profile-help-box';

export class ProfileComponent extends Component {

    /**
     * Renders profile component
     */
    render() {
        return (
            <div className='col-lg-6 d-flex flex-column flex-lg-row align-items-center justify-content-around'>
                <div className='card col-lg-7 p-3 align-self-start'>
                    <ProfileDataComponent />
                </div>
                <div className='mt-lg-0 mt-4 card col-lg-4 p-3 align-self-start'>
                    <ProfileHelpBoxComponent />
                </div>
            </div>
        );
    }
}