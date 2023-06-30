import { FC, useContext, useEffect } from "react";
import { CartContext } from "./utils/Context";
import { ActionType, Item } from "./types";

const App: FC = () => {
  const { dispatch, state } = useContext(CartContext);

  // use this if the structure of data from api is the same with the configured type of Item
  // const items: Item[] = data as Item[]

  useEffect(() => {
    async function getItems(): Promise<void> {
      try {
        const response = await fetch(
          "https://course-api.com/react-useReducer-cart-project"
        );
        const data = await response.json();

        // set the data to any to avoid compilation error since typescript have no idea on what would be the type of its properties
        const parsedItems: Item[] = (data as any).map(
          (item: any): Item => ({
            itemName: item.title,
            img: item.img,
            price: Number(item.price),
            id: item.id,
            quantity: Number(item.amount),
          })
        );

        dispatch({ type: ActionType.GET_ITEMS, payload: parsedItems });
      } catch (error) {
        console.log(error)
      }
    }
    getItems();
  }, []);

  useEffect(() => {
    dispatch({type: ActionType.CALCULATE_TOTAL})
  }, [state.cartItems])

  return (
    <div>
      <div>
        <h1>ITEMS</h1>
        <div className="items-container">
          {state.items.map((item, index) => (
            <div key={index} className="item-container">
              <img src={item.img} alt="item" />
              <h2>{item.itemName}</h2>
              <p>{item.price}</p>
              <button
                onClick={() =>
                  dispatch({ type: ActionType.ADD_TO_CART, payload: item })
                }
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1>CART</h1>
        <h3>Total: {state.total}</h3>
        <h3>Items in cart: {state.cartItems.length}</h3>
        <h3>Overall total items in cart: {state.cartItemQuantity}</h3>
        <div>
          {state.cartItems.map((item, index) => (
            <div key={index} className="item-container">
              <img src={item.img} alt="item" />
              <h2>{item.itemName}</h2>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
              <button
                onClick={() =>
                  dispatch({ type: ActionType.INCREASE_QTY, payload: item.id })
                }
              >
                Increase
              </button>
              <button
                onClick={() => { 
                  if(item.quantity === 1){
                    dispatch({ type: ActionType.REMOVE_TO_CART, payload: item.id })
                  } else {
                    dispatch({ type: ActionType.DECREASE_QTY, payload: item.id })
                  }
                }}
              >
                Deccrease
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
