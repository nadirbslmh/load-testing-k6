import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 1000,
  iterations: 1000,
};

export default function () {
  const url = "https://jsonplaceholder.typicode.com/todos";

  const payload = JSON.stringify({
    title: "my title",
    content: "my content",
    userId: 1,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    "is response status code equals 201": (r) => r.status == 201,
  });
}
