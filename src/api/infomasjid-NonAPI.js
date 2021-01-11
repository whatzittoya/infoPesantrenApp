import axios from "axios";
const instance = axios.create({
  baseURL: "http://infomasjid.my.id/api",
});

export default instance;
