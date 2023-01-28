//rxslice
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [
    {
      id: 1,
      name: "product1",
      image: '"https://i.pravatar.cc?u=1',
      price: 1000,
      quantity: 2,
    },
  ],
  dataProduct: [
    {
      id: 1,
      name: "Adidas Prophere",
      alias: "adidas-prophere",
      price: 350,
      description:
        "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
      size: "[36,37,38,39,40,41,42]",
      shortDescription:
        "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
      quantity: 995,
      deleted: false,
      categories:
        '[{"id":"ADIDAS","category":"ADIDAS"},{"id":"MEN","category":"MEN"},{"id":"WOMEN","category":"WOMEN"}]',
      relatedProducts: "[2,3,5]",
      feature: true,
      image: "https://shop.cyberlearn.vn/images/adidas-prophere.png",
    },
  ],
};

const shopReducer = createSlice({
  name: "shopReducer", // ten reducer/actionname
  initialState, // gia tri mac dinh cua reducer
  reducers: {
    getProductApiAction: (state, action) => {
      state.dataProduct = action.payload;
    },
    addToCartAction: (state, action) => {
      const itemCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemCart) {
        itemCart.quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    delItemAction: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    changeQuantityAction: (state, action) => {
      const { id, quantity } = action.payload;
      const itemCart = state.cart.find((item) => item.id === id);
      if (itemCart) {
        itemCart.quantity += quantity;
        if (itemCart.quantity < 1) {
          //   alert("Số lượng nhỏ hơn 1");
          //   itemCart.quantity -= quantity;
          if (window.confirm("Do you want delete item?")) {
            state.cart = state.cart.filter((itemCart) => itemCart.id !== id);
          } else {
            itemCart.quantity -= quantity;
          }
        }
      }
    },
  },
});

export const {
  getProductApiAction,
  addToCartAction,
  delItemAction,
  changeQuantityAction,
} = shopReducer.actions;

export default shopReducer.reducer;

//--------- action thunk -------- //
export const getAllProductApi = () => {
  return async (dispatch, getState) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
      const action = getProductApiAction(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
