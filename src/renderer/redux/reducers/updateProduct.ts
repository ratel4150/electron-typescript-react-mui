import * as actionType from "../actions/actionTypes";

const initialState = {
    post: null
};
export default function (state = initialState, action: { type: any; payload: any; }) {
    switch (action.type) {
        case actionType.UPDATED_PRODUCT: {
            return {
                ...state,
                post: action.payload
            };
        }
        default: {
            return { ...state };
        }
    }
}
