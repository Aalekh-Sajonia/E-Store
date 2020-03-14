import React, {useState} from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth , createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.style.scss';

const SignUp = () => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {displayName, email,password,confirmPassword} = userCredentials;
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword)
        {
            alert('Password dont match');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email,password);

            await createUserProfileDocument(user,{displayName});
            setUserCredentials( {
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }); 

        } catch(err) {
            console.log(err);
        }
    }

    const handleChange = event => {
        const {name,value} = event.target;
        setUserCredentials({
            ...userCredentials,
            [name] : value
        });
    };

        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput 
                    type='text'
                    name='displayName'
                    value = {displayName}
                    onChange = {handleChange}
                    label='Display Name'
                    required
                > 
                </FormInput>
                <FormInput 
                    type='text'
                    name='email'
                    value = {email}
                    onChange = {handleChange}
                    label='Email'
                    required
                > 
                </FormInput>
                <FormInput 
                    type='password'
                    name='password'
                    value = {password}
                    onChange = {handleChange}
                    label='Password'
                    required
                > 
                </FormInput>
                <FormInput 
                    type='password'
                    name='confirmPassword'
                    value = {confirmPassword}
                    onChange = {handleChange}
                    label='Confirm Password'
                    required
                > 
                </FormInput>
                <div className='buttons'>
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </div>
                </form>
            </div>
        )
}

export default SignUp;