import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

// Create a new context for text direction
const TextDirectionContext = createContext();

// Reducer function to manage text direction state
function textDirectionReducer(state, action) {
  switch (action.type) {
    case "SET_TEXT_DIRECTION":
      return { ...state, textDirection: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Context provider for text direction
export function TextDirectionProvider({ children }) {
  const initialState = {
    textDirection: "ltr", // Initial direction
  };

  const [state, dispatch] = useReducer(textDirectionReducer, initialState);

  // Memoize the value to avoid unnecessary re-renders
  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return (
    <TextDirectionContext.Provider value={value}>
      {children}
    </TextDirectionContext.Provider>
  );
}

TextDirectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the TextDirection context
export function useTextDirection() {
  const context = useContext(TextDirectionContext);
  if (context === undefined) {
    throw new Error(
      "useTextDirection must be used within a TextDirectionProvider"
    );
  }
  return context;
}

// Action to set the text direction
export const setTextDirection = (dispatch, direction) => {
  dispatch({ type: "SET_TEXT_DIRECTION", payload: direction });
};
