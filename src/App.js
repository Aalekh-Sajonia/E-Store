import React from 'react';

import { GlobalStyle } from './global.styles';
import ShopPage from './pages/shop/shop.component'
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'; 
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import SignInAndSiignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const {setCurrentUser1} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser1({
              id: snapShot.id,
              ...snapShot.data()
            });
        });
      } 
      setCurrentUser1(userAuth);
      // addCollectionAndDocuments('collections',collectionsArray.map(({title,items})=> ({ title,items})));
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {

    return (
      <div>
      <GlobalStyle />
      <Header/>
      <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={()=>this.props.currentUser ? 
            (<Redirect to='/' />) : (<SignInAndSiignUpPage/>)} />
      </Switch>
          
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser1: (user) => dispatch(setCurrentUser(user)) //pass to every reducer
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
