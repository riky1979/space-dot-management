import { combineReducers } from 'redux';
import { KEYWORD_SEARCH } from '../actions';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';

const initialState = {
    searchKeyword: ''
};

const search = (state = initialState, action) => {
    switch (action.type) {
        case KEYWORD_SEARCH :
            return { ...state, searchKeyword: action.payload };
        default :
            return state;
    }
};

const rootReducer = combineReducers({
    search,
    errors: errorReducer,
    auth: authReducer,
});

export default rootReducer;