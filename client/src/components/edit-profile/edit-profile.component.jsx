import { Component } from 'react';
import { EditProfileHelpBoxComponent } from './edit-profile-help-box';
import { EditProfileDataComponent } from './edit-profile-data';

export class EditProfileComponent extends Component {

    /**
     * Renders edit profile component
     */
    render() {
        return (
            <div className='col-lg-6 d-flex flex-column flex-lg-row align-items-center justify-content-around'>
                <div className='card col-lg-7 p-3 align-self-start'>
                    <EditProfileDataComponent />
                </div>
                <div className='mt-lg-0 mt-4 card col-lg-4 p-3 align-self-start'>
                    <EditProfileHelpBoxComponent />
                </div>
            </div>
        );
    }
}