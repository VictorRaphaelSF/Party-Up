import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import  Index from './src/pages/index';
import  Login from './src/pages/login';
import Cadastro from './src/pages/cadastro';
import Cadastropart2 from './src/pages/cadastropart2';
import Logado from './src/pages/logado';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Index'>
        <Stack.Screen 
          options={{
            headerShown: false
          }}
          name='index' component={Index}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='login' component={Login}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='cadastro' component={Cadastro}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name="cadastropart2" component={Cadastropart2}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='logado' component={Logado}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
