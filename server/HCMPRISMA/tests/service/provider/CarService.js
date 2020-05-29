import axios from "axios";
let jsonData = require("../data/cars-small.json");
export default class CarService {
  getCarsSmall() {
    return axios.get("../data/cars-small.json").then((res) => {
      //console.log("Response ", res, "end of resp");
      //return res;
    });
    //return jsonData;
  }

  getCarsMedium() {
    return axios.get("../data/cars-medium.json").then((res) => res.data.data);
  }

  getCarsLarge() {
    return axios.get("../data/cars-large.json").then((res) => res.data.data);
  }
}
