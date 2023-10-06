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
import Cadevento3 from './src/pages/cadevento3';
import Historicoevent from './src/pages/historicoevent';
import Search from './src/pages/search'
import Searched from './src/pages/searched';
import Notificação from './src/pages/notificações'
import Termos from './src/pages/termos';
import Telaprincipal from './src/pages/telaprincipal';
import Telaprofile from './src/pages/telaprofile'
import Report from './src/pages/report'
import Report2 from './src/pages/report2'
import Report3 from './src/pages/report3';
import Evento from './src/pages/evento';
import Eventoedit from './src/pages/eventoedit';
import Tags from './src/pages/tags';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='cadastropart2'>
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
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='searched' component={Searched}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='report' component={Report}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='evento' component={Evento}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='eventoedit' component={Eventoedit}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='cadevento3' component={Cadevento3}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='tags' component={Tags}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='report2' component={Report2}
        />
        <Stack.Screen
        options={{
          headerShown: false
        }}
        name='report3' component={Report3}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
