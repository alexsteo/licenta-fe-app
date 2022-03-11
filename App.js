/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React from 'react';
import {useColorScheme, View,} from 'react-native';
import {MainScreen} from "./src/components/MainScreen";

const App: () => Node = () => {

    return (
        <View>
            <MainScreen/>
        </View>
    );
};

export default App;
