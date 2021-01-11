import { useEffect, useState } from "react";
import infomasjid from "../api/infomasjid";

export default () => {
  const [results, setResults] = useState([]);
  const [resultsMasjid, setResultsMasjid] = useState(null);
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

  const getResult = async (id) => {
    const response = await infomasjid.get(`/masjid/${id}`);
    //  console.log(response.data);
    setResultsMasjid(response.data);
  };


  const showMasjidApi = async () => {
    try {

      const response = await infomasjid.get("/masjid/search", {
        params: {
          search: 'HIDAYAH',
        },
      });
      // console.log(response.data);
      setResultsMasjid(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("error");
    }
  };

  useEffect(() => {
    getResult(3);
  }, []);

  return [searchMasjidApi, resultsMasjid, errorMessage];
};
