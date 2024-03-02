import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

export type TItems = {
  _id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image: '';
  availableItem: number;
};

type TCart = {
  items: TItems[];
  totalItem: number;
};
const savedCart = localStorage.getItem('cart');
const initialState = savedCart
  ? JSON.parse(savedCart)
  : {
      items: [],
      totalItem: 0,
    };

const cartSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { cart } = action.payload;
      const addedItemIndex = state.items.findIndex(
        (p: TItems) => p._id === cart._id
      );
      if (addedItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[addedItemIndex].quantity += 1;
        state.items = updatedItems;
      } else {
        state.items = [...state.items, { ...cart, quantity: 1 }];
      }

      state.totalItem += 1;
      localStorage.setItem('cart', JSON.stringify(state));
      console.log({ state });
    },
    removeFromCart: (state, action) => {
      const { itemId } = action.payload;
      const itemIndex = state.items.findIndex(
        (item: TItems) => item._id === itemId
      );

      if (itemIndex !== -1) {
        const updatedItems = [...state.items];
        const removedItem = updatedItems.splice(itemIndex, 1)[0];
        state.items = updatedItems;
        state.totalItem -= removedItem.quantity;
      }

      localStorage.setItem('cart', JSON.stringify(state));

      console.log({ state });
    },
    increaseCart: (state, action) => {
      const { itemId, type } = action.payload;
      const updatedItems = state.items.map((item: TItems) => ({ ...item }));

      const addedItemIndex = updatedItems.findIndex(
        (item: TItems) => item._id === itemId
      );

      if (addedItemIndex !== -1) {
        if (type === 'increase') {
          updatedItems[addedItemIndex].quantity += 1;
          state.totalItem += 1;
        } else if (
          type === 'decrease' &&
          updatedItems[addedItemIndex].quantity > 1
        ) {
          updatedItems[addedItemIndex].quantity -= 1;
          state.totalItem -= 1;
        }
      }

      state.items = updatedItems;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    checkOut: (state) => {
      state.items = [];
      state.totalItem = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, checkOut, removeFromCart, increaseCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const currentCart = (state: RootState) => state.cart;
// export const currentUserData = (state: RootState) => state.auth.user;
