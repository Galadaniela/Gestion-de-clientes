import rootReducer from "./reducer.js";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddlewar from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddlewar))
);

export default store; 