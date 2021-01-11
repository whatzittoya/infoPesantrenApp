import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import navigator from "../navigation/Navigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import MasjidChooseScreen from "../screens/MasjidChooseScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import { colorTheme } from "../styles/global";

const AppStack = navigator;
const AuthStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    ChooseMasjid: MasjidChooseScreen,
  },
  {
    initialRouteName: "Welcome",
    defaultNavigationOptions: {
      title: "Info Pesantren",
      headerStyle: {
        backgroundColor: colorTheme.primary,
      },
    },
  }
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: "AuthLoading",
  }
);
