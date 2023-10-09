# load-testing-k6

Load testing example using k6.

## Notes

1. Make sure to install k6 [here](https://k6.io/docs/get-started/installation/).
2. The sample API that is used for this example is [JSON Placeholder API](https://jsonplaceholder.typicode.com/guide/).
3. Some tests are generated using ChatGPT.

## How to Use

1. Clone this repository.
2. Run the test followed with the file name in this repository.

```sh
k6 run file_name.js
```

Example:

```sh
k6 run create_todos.js
```

## Additional Configurations

1. You can specify the number of virtual users and the duration. In this example the 10 virtual users is used with the duration of 30 seconds.

```sh
k6 run --vus 10 --duration 30s test.js
```

2. You can specify the testing report format. In this example the testing report is generated in CSV file.

```sh
k6 run --out csv=first_test.csv test.js
```
