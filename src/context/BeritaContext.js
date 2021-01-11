import createDataContext from "./createDataContext";
import infomasjid from "../api/infomasjid";

const beritaReducer = (state, action) => {
  switch (action.type) {
    case "get_berita":
      return { ...state, berita_all: action.payload };
    case "set_category":
      return { ...state, category: action.payload };
   
    case "set_berita_profile":
      //set API to load masjid profile

      return {
        ...state,
        berita_profile: state.berita_all.filter((resultBerita) => {
          return resultBerita.masjid_id === action.payload;
        }),
      };
    default:
      return state;
  }
};

const getBerita = (dispatch) => {
  return async (callback) => {
    const response = await infomasjid.get("/berita");

    dispatch({ type: "get_berita", payload: response.data });
    if (callback) callback();
  };
};

const setBeritaProfile = (dispatch) => {
  return (id, callback) => {
    dispatch({ type: "set_berita_profile", payload: id });
    if (callback) callback();
  };
};
const searchBerita = (dispatch) => {
  return async (searchTerm, callback) => {
    const response = await infomasjid.get("/berita/search", {
      params: {
        search: searchTerm,
      },
    });
    dispatch({ type: "get_berita", payload: response.data });
    if (callback) callback();
  };
};

const setSelectedCategory = (dispatch) => {
  return (data) => {
    dispatch({
      type: "set_category",
      payload: { name: data.name, value: data.value },
    });
  };
};

export const { Context, Provider } = createDataContext(
  beritaReducer,
  {
    getBerita,
    searchBerita,
    setSelectedCategory,
    setBeritaProfile,
  },
  { berita_all: [], berita_profile: [], category: {} }
);
