import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { partData , loginreducer} from "./reducer";
import logger from "redux-logger";


const persistConfig = {
    key: 'root',
    storage,
  }

const reducers = combineReducers({partData:partData,loginreducer:loginreducer});
const persistedReducer = persistReducer(persistConfig, reducers)
let store = createStore(persistedReducer)
let persistor = persistStore(store)

export {store, persistor}



