import axios from "axios";
import { getTokenFromLocalStorage } from "../components/helpers/localstorage.helper";

export const instance = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    Authorization:'Bearer '+ getTokenFromLocalStorage() || '',
  },
});

//headers: {
//    "Access-Control-Allow-Origin": "*",
//    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//  }