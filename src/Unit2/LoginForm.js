import React from 'react'

export default function LoginForm(props) {
    const { loginValues, loginUpdate, loginSubmit } = props

    //Functions Establishing Input Interactivity:
    const onChange = event => {
        const { name, value } = event.target
        loginUpdate(name, value)
    }

    const onSubmit = event => {
        event.preventDefault()
        loginSubmit()
    }

    return (
        <div className='login-form'>
            <form className='login-form-section' onSubmit={onSubmit}>
                <label>Role:
                    <select value={loginValues.role} name='role' onChange={onChange} placeholder='--select--'>
                        <option value=''>--Select Position--</option>
                        <option value='Instructor'>Instructor</option>
                        <option value='User'>User</option>
                    </select>
                </label>

                <label>Password:
                    <input
                        type='text'
                        onChange={onChange}
                        value={loginValues.password}
                        name='password'
                    />
                </label>

                <label>Primary Email:
                    <input
                        type='text'
                        onChange={onChange}
                        value={loginValues.primaryemail}
                        name='primaryemail'
                        maxLength='40'
                    />
                </label>

                <label>Username:
                    <input
                        type='text'
                        onChange={onChange}
                        value={loginValues.username}
                        name='username'
                        maxLength='20'
                    />
                </label>
                
                <div className='loginSubmit'>
                    <button disabled={!loginValues.username || !loginValues.password || !loginValues.primaryemail || !loginValues.role}>Submit</button>
                </div>
            </form>
        </div>
    )
}