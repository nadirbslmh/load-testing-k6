import http from "k6/http";
import { check, sleep } from "k6";

export default function () {
  // Define the API endpoint URL
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

  // Send a GET request to the API
  const response = http.get(apiUrl);

  // Check if the response status code is 200 (OK)
  check(response, {
    "Status is 200 OK": (r) => r.status === 200,
  });

  // Check if the response body is a valid JSON array of objects
  check(response, {
    "Response body is valid": (r) => {
      try {
        const jsonData = JSON.parse(r.body);
        return (
          Array.isArray(jsonData) &&
          jsonData.length > 0 &&
          typeof jsonData[0] === "object" &&
          "id" in jsonData[0] &&
          "title" in jsonData[0]
        );
      } catch (e) {
        return false;
      }
    },
  });

  // Optional: You can add more specific checks on the response data if needed.

  // Sleep for a short duration (e.g., 1 second) to simulate user think time
  sleep(1);
}
