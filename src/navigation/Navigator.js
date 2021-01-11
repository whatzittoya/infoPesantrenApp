import { createStackNavigator } from "react-navigation-stack";
import BeritaShowScreen from "../screens/BeritaShowScreen";
import MasjidShowScreen from "../screens/MasjidShowScreen";
import MasjidProfileScreen from "../screens/MasjidProfileScreen";
import MasjidChooseScreen from "../screens/MasjidChooseScreen";
import MasjidScreen from "../screens/MasjidScreen";

import BottomTab from "../navigation/BottomTab";

import HomePageScreen from "../screens/HomeScreen";
import TestScreen from "../screens/TestScreen";
import { colorTheme } from "../styles/global";

const navigator = createStackNavigator(
  {
    Home: {
      screen: BottomTab,
      navigationOptions: { headerShown: false },
    },
    BeritaShow: BeritaShowScreen,
    MasjidShow: MasjidShowScreen,

    MasjidChoose: {
      screen: MasjidScreen,
      navigationOptions: {
        title: "Pilih Pesantren",
      },
    },
    MasjidProfileScreen: {
      screen: MasjidProfileScreen,
      navigationOptions: {
        title: "Kelola Mesjid Pilihan",
      },
    },
    MasjidChooseScreen: {
      screen: MasjidChooseScreen,
      navigationOptions: {
        title: "Pilih Masjid",
      },
    },
    HomePage: HomePageScreen,
    // Welcome: WelcomeScreen,
    TestPage: TestScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Info Masjid",
      headerStyle: {
        backgroundColor: colorTheme.primary,
      },
    },
  }
);

export default navigator;
