import { createContext, useReducer } from "react";

export const CommentsContext = createContext();

// action might be different
export function commentsReducer(state, action) {
  switch (action.type) {
    case "SET_COMMENTS":
      return {
        comments: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        comments: [action.payload, ...state.comments], //first is the new one then add old ones
      };
    default:
      return state;
  }
}

export const CommentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentsReducer, {
    comments: null,
  });
  // describe the state change
  // dispatch({type: 'SET_COMMENTS', payload:[{},{}]})

  return (
    <CommentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CommentsContext.Provider>
  );
};
