import axios from "axios";

export class CustomerService {
  getCustomersLarge() {
    return axios
      .get("assets/demo/data/customers-large.json")
      .then((res) => res.data.data);
  }
}
