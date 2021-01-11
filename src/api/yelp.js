import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer 4d-LvkaoVZOGnDEqip5lTtNi0lzeOevK5R-a4fHeLxLAJYQoVaRbIUuQylo4Lcux1-CzFi_RghsGcmzH5pNKsHfOZZgl3AblVYf_kpLDcwRHD95md8CTq8LOm7IZX3Yx",
  },
});
