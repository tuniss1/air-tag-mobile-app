import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import ItemScreen from "screens/ItemScreen";
import SignUpScreen from "screens/SignUpScreen";
import SignInScreen from "screens/SignInScreen";
import ResetPasswordScreen from "screens/ResetPasswordScreen";
import ItemsList from "screens/ItemsList";

// Firebase:
import "./firebases/firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const subscriber = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (pending) setPending(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (pending) return null;

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
          }}
        >
          {currentUser ? (
            <>
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen name="Item" component={ItemScreen} />
              <Stack.Screen name="Item" component={ItemsList} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
