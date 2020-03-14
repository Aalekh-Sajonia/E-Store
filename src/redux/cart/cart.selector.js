import { createSelector } from 'reselect';
// memoization
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => 
        cartItems.reduce(
            (acc,cc) => 
            acc+ cc.quantity,
        0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => 
        cartItems.reduce(
            (acc,cc) => 
            acc+ cc.quantity*cc.price,
        0)
);