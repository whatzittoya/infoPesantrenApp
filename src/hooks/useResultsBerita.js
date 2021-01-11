import { useEffect, useState } from "react";
import yelp from "../api/yelp";
import infomasjid from "../api/infomasjid";

export default () => {
  const [results, setResults] = useState([]);
  const [resultsBerita, setResultsBerita] = useState([]);
  const [resultsMesjid, setResultsMesjid] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const searchBeritaApi = async (searchTerm) => {
    try {
      const response = await infomasjid.get("/berita/search", {
        params: {
          search: searchTerm,
        },
      });
      setResultsBerita(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("error");
    }
  };
  const showBeritaApi = async () => {
    try {
      const response = await infomasjid.get("/berita", {});
      setResultsBerita(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("error");
    }
  };
  const searchMesjidApi = async (searchTerm) => {
    try {
      const response = await infomasjid.get("/mesjid/search", {
        params: {
          search: searchTerm,
        },
      });
      setResultsMesjid(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("error");
    }
  };
  const showMesjidApi = async () => {
    try {
      const response = await infomasjid.get("/mesjid", {});
      setResultsMesjid(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("error");
    }
  };

  useEffect(() => {
    showBeritaApi();
    showMesjidApi();
  }, []);

  return [searchBeritaApi, resultsBerita, errorMessage];
};
