import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],  // jis order me dalenge usi order me output aaega
    (user,cart) => user.currentUser
);