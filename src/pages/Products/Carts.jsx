import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeQuantityAction,
  delItemAction,
} from "../../Redux/reducers/shopReducer";

export default function Carts(props) {
  const { cart } = useSelector((state) => state.shopReducer);
  const dispatch = useDispatch();

  return (
    <>
      <h3>Carts</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img src={item.image} width={50} alt=""></img>
                </td>
                <td>{item.price}</td>
                <td>
                  <button
                    className="btn btn-outline-primary mr-2"
                    onClick={() => {
                      const itemQuantity = {
                        id: item.id,
                        quantity: 1,
                      };
                      const action = changeQuantityAction(itemQuantity);
                      dispatch(action);
                    }}
                  >
                    +
                  </button>
                  {item.quantity}
                  <button
                    className="btn btn-outline-primary ml-2"
                    onClick={() => {
                      const itemQuantity = {
                        id: item.id,
                        quantity: -1,
                      };
                      const action = changeQuantityAction(itemQuantity);
                      dispatch(action);
                    }}
                  >
                    -
                  </button>
                </td>
                <td>{item.price * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      const action = delItemAction(item.id);
                      dispatch(action);
                    }}
                  >
                    Del
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
