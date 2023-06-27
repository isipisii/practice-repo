import { useReducer, useRef } from "react";
import { ACTION_TYPES } from "./Actions";
import { reducer, INITIAL_STATE } from "./Reducer";

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const tagRef = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
        type: ACTION_TYPES.CHANGE_INPUT,
        payload: {name: e.target.value, value: e.target.value}
    })
  };

  const handleTag = () => {
    const tags = tagRef.current.value.split(",");
    tags.forEach(tag => {
        dispatch({ type: ACTION_TYPES.ADD_TAG, payload: tag})
    });
  }


  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="Desc"
          onChange={handleChange}
          name="description"
        />
        <input
          type="number"
          placeholder="Price"
          onChange={handleChange}
          name="price"
        />
        <p>Category:</p>
        <select onChange={handleChange} name="category">
          <option value="sneakers">Sneakers</option>
          <option value="tshirts">T-shirts</option>
          <option value="jeans">Jeans</option>
        </select>
        <p>Tags:</p>
        <textarea ref={tagRef} placeholder="Seperate tags with commas..."></textarea>
        <button onClick={handleTag} type="button">
          Add Tags
        </button>
        <div className="tags">
          {state.tags.map((tag) => (
            <small
              onClick={() => dispatch({type: ACTION_TYPES.REMOVE_TAG, payload: tag})}
              key={tag}
            >
              {tag}
            </small>
          ))}
        </div>
        <div className="quantity">
          <button onClick={() => dispatch({type: ACTION_TYPES.DECREASE})} type="button">
            -
          </button>
          <span>Quantity ({state.quantity})</span>
          <button onClick={() => dispatch({type: ACTION_TYPES.INCREASE})} type="button">
            +
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
