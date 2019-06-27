import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import defaultReducer from "../reducers/defaultReducer";
import velibReducerStore from "../reducers/velibReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
  key:'root',
  storage,
  stateReconciler:autoMergeLevel2
}

const velibReducer = persistReducer(persistConfig, velibReducerStore)

export default () => {
	const rootReducer = combineReducers({
		defaultReducer,
		velibReducer
	});
	let store = createStore(rootReducer, composeWithDevTools());
	let persistor = persistStore(store);
	return {store, persistor};
}