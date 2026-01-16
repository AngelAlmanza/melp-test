import { ENVIRONMENT } from "@/constants/environment";
import axios from "axios";

// Returns CORS error, needs to be fixed in backend
// const api = axios.create({
//   baseURL: "https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json",
// });

// I will use this data locally for now
const url = `${ENVIRONMENT.BASE_URL}data/data_melp.json`;
const api = axios.create({
  baseURL: url,
});

export { api };

