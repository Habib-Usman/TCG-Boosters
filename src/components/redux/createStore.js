import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";

import rootReducer from "./rootReducer";

// export const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware());
// export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//
export default store;

//commenting out logger/middleware because it causing a crash in console. when logged in the logger is looping
