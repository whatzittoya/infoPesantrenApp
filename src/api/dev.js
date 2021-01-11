import axios from "axios";

export default axios.create({
  baseURL: "https://icare.test/api",
  headers: {
    Authorization: "",
  },
});
