import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import  Index from './src/pages/index';
import  Login from './src/pages/login';
import Cadastro from './src/pages/cadastro';
import Cadastropart2 from './src/pages/cadastropart2';
import Cadastropart3 from './src/pages/cadastropart3';
import Cadevento from './src/pages/cadevento';
import Cadevento2 from './src/pages/cadevento2';
import Historicoevent from './src/pages/historicoevent';
import Search from './src/pages/search'
import Notificação from './src/pages/notificações'
import Termos from './src/pages/termos';
import Telaprincipal from './src/pages/telaprincipal';
import Telaprofile from './src/pages/telaprofile'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='index'>
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
        name='cadastropart3' component={Cadastropart3}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='termos' component={Termos}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='notificação' component={Notificação}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='telaprincipal' component={Telaprincipal}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='cadevento' component={Cadevento}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='cadevento2' component={Cadevento2}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='historicoevent' component={Historicoevent}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='search' component={Search}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='telaprofile' component={Telaprofile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
