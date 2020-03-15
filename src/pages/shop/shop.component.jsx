import React ,{lazy,Suspense} from 'react';

import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Spinner from '../../components/spinner/spinner.component';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));

class ShopPage extends React.Component{
  
    componentDidMount() {
       const {fetchCollectionsStartAsync} = this.props;
       fetchCollectionsStartAsync();
    }

    render() {
       const {match} = this.props;
       return (
        <div className='shop-page'>
        <Suspense fallback={<Spinner/>}>
            <Route exact path={`${match.path}`} component = {CollectionsOverviewContainer}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>  
        </Suspense>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});
export default connect(null,mapDispatchToProps)(ShopPage);