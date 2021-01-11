import createDataContext from "./createDataContext";
import infomasjid from "../api/infomasjid";

const masjidReducer = (state, action) => {
  switch (action.type) {
    case "get_masjid":
      return { ...state, masjid_all: action.payload };
    case "get_masjid_profile":
      //set API to load masjid profile
      //   const masjid_profile = state.masjid_all
      //     .filter((item) => {
      //       return item.masjid_id >= 10;
      //     })
      //     .map((item) => {
      //       return item.masjid_id === 13 ? { ...item, selected: true } : item;
      //     });
      return { ...state, masjid_profile: action.payload };
    case "set_masjid_profile":
      return {
        ...state,
        masjid_profile: state.masjid_profile.map((item) => {
          return item.masjid_id === action.payload
            ? { ...item, selected: true }
            : { ...item, selected: false };
        }),
      };
    case "set_default_masjid_profile":
      return {
        ...state,
        masjid_profile: state.masjid_profile.map((item, index) => {
          return index === 0
            ? { ...item, selected: true }
            : { ...item, selected: false };
        }),
      };
    case "add_masjid_profile":
      const new_masjid = state.masjid_all.find((item) => {
        return item.masjid_id == action.payload;
      });
      const new_masjid_profile = [...state.masjid_profile, new_masjid];

      return {
        ...state,
        masjid_profile: new_masjid_profile,
      };
    case "delete_masjid_profile":
      return {
        ...state,
        masjid_profile: state.masjid_profile.filter(
          (item) => item.masjid_id !== action.payload
        ),
      };
    default:
      return state;
  }
};
const getMasjid = (dispatch) => {
  return async (callback) => {
    const response = await infomasjid.get("/masjid");
    dispatch({ type: "get_masjid", payload: response.data });
    if (callback) callback();
  };
};
const getMasjidProfile = (dispatch) => {
  return (masjid, callback) => {
    dispatch({ type: "get_masjid_profile", payload: masjid });
    if (callback) callback();
  };
};
const setMasjidProfile = (dispatch) => {
  return async (user_id, masjid_id, callback) => {
    try {
      const response = await infomasjid.post("/masjid/follow/select", {
        user_id,
        masjid_id,
      });
      dispatch({ type: "set_masjid_profile", payload: masjid_id });
    } catch (error) {
      console.log("error");
    }
    if (callback) callback();
  };
};
const setDefaultMasjidProfile = (dispatch) => {
  return (masjid_id, callback) => {
    dispatch({ type: "set_default_masjid_profile", payload: masjid_id });

    if (callback) callback();
  };
};
const addMasjidProfile = (dispatch) => {
  return async (user_id, masjid_id, callback) => {
    try {
      console.log(user_id);
      const response = await infomasjid.post("/masjid/follow", {
        user_id,
        masjid_id,
      });
      dispatch({ type: "add_masjid_profile", payload: masjid_id });
    } catch (error) {
      console.log("error");
    }
    if (callback) callback();
  };
};
const deleteMasjidProfile = (dispatch) => {
  return async (user_id, masjid_id, callback) => {
    console.log(user_id, masjid_id);
    const response = await infomasjid.post("/masjid/unfollow", {
      user_id,
      masjid_id,
    });
    dispatch({ type: "delete_masjid_profile", payload: masjid_id });

    if (callback) callback();
  };
};
const searchMasjid = (dispatch) => {
  return async (searchTerm, callback) => {
    const response = await infomasjid.get("/masjid/search", {
      params: {
        search: searchTerm,
      },
    });
    dispatch({ type: "get_masjid", payload: response.data });
    if (callback) callback();
  };
};
export const { Context, Provider } = createDataContext(
  masjidReducer,
  {
    getMasjid,
    searchMasjid,
    getMasjidProfile,
    setMasjidProfile,
    deleteMasjidProfile,
    addMasjidProfile,
    setDefaultMasjidProfile,
  },
  { masjid_all: [], masjid_profile: [] }
);
