import React from 'react';

import './collections-overview.styles.scss';
import CollectionPreview  from '../preview-collection/preview-collection.component';

import {selectCollectionsForPreview} from '../../redux/shop/shop.selector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const CollectionsOverview = ({collections}) => (
    <div className='collections-overview'>
    {
        collections.map(({id, ...otherCollectionProps}) => {
            return (
                <CollectionPreview key={id} {...otherCollectionProps} />
            )
        })
    }
    </div>
);

const mapStateToProps= createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);