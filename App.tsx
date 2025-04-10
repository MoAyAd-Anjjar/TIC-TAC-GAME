import React from "react";
import GamePage from "./GamePage";
import HomePage from "./Homepage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GameSolo from "./GameSolo";
import GameAI from "./GameAI";
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="solo" component={GameSolo} />
        <Stack.Screen name="online" component={GamePage} />
        <Stack.Screen name="AI" component={GameAI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
