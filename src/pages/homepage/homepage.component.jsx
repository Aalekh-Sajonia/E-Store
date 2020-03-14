import React from 'react';

import './homepage.styles.scss';
import Directory from '../../components/directory/directory.component';
import {HomePageContainer} from './homepage.style';

const HomePage  = () => {
    return (
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
    );  
}

export default HomePage;