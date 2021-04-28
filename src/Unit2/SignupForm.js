import React from 'react'




//BUILDS SUBMIT FORM:
export default function SignupForm(props) {
    const { signupValues, signupUpdate, signupSubmit } = props

    //Functions Establishing Input Interactivity:
    const onChange = event => {
        const { name, value } = event.target
        signupUpdate(name, value)
    }

    const onSubmit = event => {
        event.preventDefault()
        signupSubmit()
    }

    return (
        <div className='signup-form'>
            <form className='signup-form-section' onSubmit={onSubmit}>
                <label>Role:
                    <select value={signupValues.role} name='role' onChange={onChange} placeholder='...select...'>
                        <option value=''>Select Postion:</option>
                        <option value='Instructor'>Instructor</option>
                        <option value='User'>User</option>
                    </select>
                </label>

                <label>Primary Email:
                    <input
                        type='text'
                        onChange={onChange}
                        value={signupValues.email}
                        name='email'
                        maxLength='40'
                    />
                </label>

                <label>Username:
                    <input
                        type='text'
                        onChange={onChange}
                        value={signupValues.username}
                        name='username'
                        maxLength='20'
                    />
                </label>

                <label>Password:
                    <input
                        type='text'
                        onChange={onChange}
                        value={signupValues.password}
                        name='password'
                    />
                </label>
                
                <div className='submitbtn'>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}