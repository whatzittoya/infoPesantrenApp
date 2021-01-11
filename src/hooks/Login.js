import { useEffect, useContext } from "react";
import infomasjid from "../api/infomasjid";
import { Context as UserContext } from "../context/UserContext";
import { Context as MasjidContext } from "../context/MasjidContext";
import Constants from "expo-constants";

const loginUser = async () => {
  const { state: stateUser, setUser } = useContext(UserContext);
  const { state: stateMasjid, getMasjidProfile } = useContext(MasjidContext);
  const device_id = Constants.deviceId;

  try {
    const response = await infomasjid.post("/login", {
      params: {
        device_id: device_id,
      },
    });
    if (response.data.result === "choose_mesjid") {
      return "choose_mesjid";
    } else {
      setUser(response.data.user, device_id);
      getMasjidProfile(response.data.masjid);
      return "home";
    }
  } catch (error) {
    console.log("error");
  }
};
export { loginUser };
