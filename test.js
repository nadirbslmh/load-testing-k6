import http from "k6/http";
import { sleep } from "k6";

export default function () {
  // send GET request
  http.get("https://test.k6.io");
  sleep(1);
}
