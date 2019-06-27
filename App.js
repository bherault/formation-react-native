import React from "react";
import {Provider} from "react-redux";
import createStore from "./src/store/index";
import AppNavigation from "./src/navigations/AppNavigation";
import { PersistGate } from 'redux-persist/integration/react';

const store = createStore();

export default class App extends React.Component {

	render() {
		return (
			<Provider store={store.store}>
				<PersistGate loading={null} persistor={store.persistor}>
					<AppNavigation />
				</PersistGate>
			</Provider>
		);
	}
}