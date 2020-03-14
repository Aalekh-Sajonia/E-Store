import React from 'react';
import CartIcon from '../cart-icon/cart-icon.component';
import { createStructuredSelector } from 'reselect';
import {connect} from 'react-redux';  //connect is a higher order component 
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles';
const Header = ({currentUser, hidden}) => {
    return (
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo'/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to = '/shop'>
                    SHOP
                </OptionLink>
             {/*   <OptionLink to = '/shop'>
                    CONTACT
                    </OptionLink>  */}
                {
                    currentUser ?
                    <OptionLink as={'div'} onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                    :
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
                }
                <CartIcon/>
            </OptionsContainer>
            {
                hidden ? null : <CartDropdown/>
            }
        </HeaderContainer>
    );
}

const mapStateToProps = createStructuredSelector({   // automatically bhej dega global state
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);