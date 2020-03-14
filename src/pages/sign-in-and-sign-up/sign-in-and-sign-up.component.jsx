import React from 'react';

import './sign-in-and-sign-up.styles.scss';
import SignIn from '../../components/sign-in/sign-in.component';
import SIgnUp from '../../components/sign-up/sign-up.component';
import SignUp from '../../components/sign-up/sign-up.component';


const SignInAndSiignUpPage = () => {
    return (
        <div className='sign-in-and-sign-up'>
        <SignIn/>
        <SignUp/>
        </div>
    )
}

export default SignInAndSiignUpPage;