import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    first_scenario: {
      executor: "shared-iterations",
      startTime: "0s",
      vus: 5,
      iterations: 10,
    },
    second_scenario: {
      executor: "shared-iterations",
      startTime: "5s",
      vus: 10,
      iterations: 100,
    },
  },
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

export default () => {
  const getAllResponse = http.get(`${BASE_URL}/todos`);

  check(getAllResponse, {
    "is response status code equals 200": (r) => r.status == 200,
  });
};
