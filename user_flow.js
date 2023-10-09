import http from "k6/http";
import { check, sleep, group } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "30s", target: 10 },
    { duration: "30s", target: 0 },
  ],
};

export default function () {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  const userId = 1;

  // User 1: Get all posts
  group("Get all posts", function () {
    const allPostsResponse = http.get(`${baseUrl}/posts`);
    check(allPostsResponse, {
      "Status is 200 OK": (r) => r.status === 200,
      "Response has valid structure": (r) => {
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
  });

  // User 2: Get a single post
  group("Get single post", function () {
    const singlePostResponse = http.get(`${baseUrl}/posts/1`);
    check(singlePostResponse, {
      "Status is 200 OK": (r) => r.status === 200,
      "Response has valid structure": (r) => {
        try {
          const jsonData = JSON.parse(r.body);
          return (
            "id" in jsonData &&
            "title" in jsonData &&
            "body" in jsonData &&
            "userId" in jsonData
          );
        } catch (e) {
          return false;
        }
      },
    });
  });

  // User 3: Create a new post
  group("Create new post", function () {
    const requestBody = {
      title: "foo",
      body: "bar",
      userId: userId,
    };
    const headers = { "Content-Type": "application/json" };
    const createPostResponse = http.post(
      `${baseUrl}/posts`,
      JSON.stringify(requestBody),
      { headers: headers }
    );
    check(createPostResponse, {
      "Status is 201 Created": (r) => r.status === 201,
      "Response has valid structure": (r) => {
        try {
          const jsonData = JSON.parse(r.body);
          return (
            "id" in jsonData &&
            "title" in jsonData &&
            "body" in jsonData &&
            "userId" in jsonData
          );
        } catch (e) {
          return false;
        }
      },
    });
  });

  // Sleep for a short duration (e.g., 1 second) to simulate user think time
  sleep(1);
}
