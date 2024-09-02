import axios from "axios";

export const getCurrency = () => {
  return axios.get("https://status.neuralgeneration.com/api/currency");
};
