/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React from 'react';
import {View,} from 'react-native';
import {MainScreen} from "./src/components/screens/MainScreen";
import {Provider} from "react-redux";
import {createStore} from "redux";

import rootReducer from './src/store/reducer/navReducer';
const store = createStore(rootReducer);

const App: () => Node = () => {
    return (
        <Provider store={store}>
            <View>
                <MainScreen/>
            </View>
        </Provider>
    );
};

export default App;
