import React, { useState } from 'react';

import LoginForm from './LoginForm';

const initialFormValues = {
  role: '',
  password: '',
  primaryemail: '',
  username: '',
};

export default function Login() {
  const [formValues, setFormValues] = useState(initialFormValues)


  //Functions Input Interactivity:
  const updateForm = (inputName, inputValue) => {
    setFormValues({...formValues, [inputName]: inputValue })
  }
  const submitForm = () => {
    const newminuser = {
      password: formValues.password,
      primaryemail: formValues.primaryemail,
      username: formValues.username,
    }

    
    //LOGIN FUNCTIONALITY HERE:
      //*Changed newClient to newminuser bc swaggerUI specifies that for backend
      //*I gave initialFormValues role but not the newminuser because of the object model
      //*Not entirely certain how you want to initialize auth code to instructor in login logic but I left the role drop down selector so it could be done
  }

  return (
      <div className='login-sectional'>
        <h3>
          LOGIN Styling.......</h3>
        <LoginForm
          loginValues={formValues}
          loginUpdate={updateForm}
          loginSubmit={submitForm}
        />
      </div>
  );
}
