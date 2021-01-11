import { useEffect, useState } from "react";
import yelp from "../api/yelp";
import infomasjid from "../api/infomasjid";

export default () => {
  const [results, setResults] = useState([]);
  const [resultsMasjid, setResultsMasjid] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchMasjidApi = async (searchTerm) => {
    try {
      const response = await infomasjid.get("/masjid/search", {
        params: {
          search: searchTerm,
        },
      });
      setResultsMasjid(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("error");
    }
  };
  const showMasjidApi = async () => {
    try {
      const response = await infomasjid.get("/masjid", {});
      // console.log(response.data);
      setResultsMasjid(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("error");
    }
  };

  useEffect(() => {
    showMasjidApi();
  }, []);

  return [searchMasjidApi, resultsMasjid, errorMessage];
};
