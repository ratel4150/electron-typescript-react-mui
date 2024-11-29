import * as actionType from "../actions/actionTypes";

const initialState = {
  posts: []
};

export default function (state = initialState, action: { type: any; payload: any; }) {
  switch (action.type) {
    case actionType.GOT_PRODUCTS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
}
