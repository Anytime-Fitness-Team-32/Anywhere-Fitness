import React, { useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import SignupForm from './SignupForm'
import { baseURL } from '../Unit3/utils/baseURL';
import { axiosWithAuth } from '../Unit3/utils/axiosWithAuth';

const initialFormValues = {
  role: '',
  primaryemail: '',
  username: '',
  password: '',
}

export default function Signup(props) {
  const [formValues, setFormValues] = useState(initialFormValues)
  const history = useHistory();

  //Functions Input Interactivity:
  const updateForm = (inputName, inputValue) => {
    setFormValues({...formValues, [inputName]: inputValue })
  }

  //LOGIN FUNCTION
  const submitForm = () => {
    const newminuser = {
      primaryemail: formValues.primaryemail,
      username: formValues.username,
      password: formValues.password,
    }

    //PREVENT EMPTY SUBMISSIONS:
    if (newminuser.username === '' || newminuser.password === '' || newminuser.primaryemail === '' || newminuser.role=== '') return
    //Axios POSTS HERE (should CLEAR form on successful submission...avoids multiple posts of same card):

    axios.post(`${baseURL}/createnew${formValues.role}`, newminuser) 
      .then(res => {
        setFormValues(initialFormValues)
        window.localStorage.setItem('token', res.data.access_token)
        axiosWithAuth().get(`${baseURL}/users/getuserinfo`)
          .then(res => {
            console.log(res)
            window.localStorage.setItem('role', res.data.role)
            formValues.role === 'instructor' ? history.push('/manage') : history.push('/dashboard')
          })
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <div className='login-sectional'>
      <h3>SIGNUP Styling.......</h3>
      <SignupForm
        signupValues={formValues}
        signupUpdate={updateForm}
        signupSubmit={submitForm}
      />
    </div>
  );
}
