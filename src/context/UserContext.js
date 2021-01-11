import createDataContext from "./createDataContext";
import infomasjid from "../api/infomasjid";
import AsyncStorage from "@react-native-async-storage/async-storage";
const userReducer = (state, action) => {
  switch (action.type) {
    case "set_user":
      return {
        ...state,
        user: action.payload.user,
        device_id: action.payload.device_id,
      };

    default:
      return state;
  }
};

const setUser = (dispatch) => {
  return (user, device_id, callback) => {
    dispatch({ type: "set_user", payload: { user, device_id } });
    if (callback) callback();
  };
};
const login = (dispatch) => {
  return async (device_id, callback) => {
    const response = await infomasjid.post("/login", {
      device_id,
    });
    await AsyncStorage.setItem("token", response.data.success.token);
    dispatch({
      type: "set_user",
      payload: { user: response.data.user, device_id },
    });
    if (callback) callback(response.data);
  };
};
export const { Context, Provider } = createDataContext(
  userReducer,
  {
    setUser,
    login,
  },
  { user: [], device_id: null }
);
