import 'bootstrap/dist/css/bootstrap.min.css';
import { EditProfileComponent } from 'components/edit-profile/edit-profile.component';
import { LoginComponent } from 'components/login/login.component';
import { ProfileComponent } from 'components/profile/profile.component';
import { RegistrationComponent } from 'components/registration/registration.component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='d-flex align-items-center justify-content-center mt-4'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginComponent />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/register' element={<RegistrationComponent />} />
          <Route path='/profile' element={<ProfileComponent />} />
          <Route path='/profile/edit' element={<EditProfileComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
