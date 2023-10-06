import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "10s",
};

export default function () {
  const url = "https://jsonplaceholder.typicode.com/todos";
  const response = http.get(url);

  check(response, {
    "is response status code equals 200": (r) => r.status == 200,
  });
}
