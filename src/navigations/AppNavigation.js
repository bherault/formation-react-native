import MainScreen from "../screens/MainScreen";
import HomeScreen from "../screens/HomeScreen";
import FlexScreen from "../screens/FlexScreen";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";

const TabNavigator = createBottomTabNavigator({
   	Design: FlexScreen,
   	Accueil: HomeScreen,
   	Liste: MainScreen,
});

export default AppNavigation = createAppContainer(TabNavigator);