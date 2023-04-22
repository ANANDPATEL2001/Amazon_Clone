export const initialState = {
    // Initially the Basket is empty
    basket: [],
};

// Now we are using the 'Selector' whic is basically used in Production Environment
// Initial value of the 'amount' is passed as 0
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);


const reducer = (state, action) => {
    // console.log(action);

    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1)
            }
            else {
                console.warn(`Cant remove the Product {id : ${action.id}} as its not in the Cart !!`)
            }

            return {
                ...state,
                basket: newBasket
                // basket: state.basket.filter(item => item.id !== action.id)
            }

        default:
            return state;
    }
};

export default reducer;