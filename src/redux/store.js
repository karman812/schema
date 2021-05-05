import {applyMiddleware, combineReducers, compose, createStore} from "redux";import thunk from "redux-thunk";
import reducer from "./reducer";
import {reducer as formReducer} from "redux-form";


let reducers = combineReducers({
    page: reducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)
));

export default store