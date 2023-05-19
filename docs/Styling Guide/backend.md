# Backend Styling
- Most of the styling in the backend is enforced by the extension `eslint`
  - The `estlint` styling uses [this file](https://github.com/Taehoya/Adventure-Audit/blob/main/server/.eslintrc.json) to further define settings
- Style and format enforced by estlint
  - Consistant code block spacing
  - Max line length
  - using camel case for local variable names
- Styling choices not enforced by estlint
  - Functions related to `POST` endpoints, will have the "create" prefix
  - Functions related to `DELETE` endpoints, will have the "delete" prefix
  - `PUT` endpoints are used to update a record
    - `PUT` endpoints are given the `id` for the record that will be updated as a path parameter
    - `PUT` endpoints are given the data that the record will be updated with as part of the body of the request
  - Functions that get a single record will be postfixed with the field that will idenity the requested record
    - Exception: If the record is being selected based on it's `ID` (or there is only one function to get this type of record) there will be no postfix. e.g. `getUser` instead of `getUserByUserID`
  - Functions that get records based on a foriegn key will have the name of type of foriegn key before the type of the record. e.g. `getUserTrips` returns records of type `trip` based on the foriegn key of a `user_id`
  - For imports and exports, each object will be on it's own line
  - For testing files, each function/endpoint will have a `describe` block explaining which function/endpoint is being tested
  - `model` and `controller` function will have a comment explaining what they do
  - Controller Style
    - The name of `controller` functions will be postfixed with "Controller"
    - `controller` functions will call a `model` function with the same name (but without the "Controller" postfix)
    - Parameters for `controller` functions will be in snake case (enforced by validators)
    - Input validation is done in the `controller` function, `model` functions will assume valid data
    - `controller` functions that update a record will return an 400 HTTP status code if no record is changed
    - `controller` functions that delete a record will return an 400 HTTP status code if no record is deleted
    - `controller` functions that successfully create, delete or update a record will return an object containing the `statusCode`, a `message` saying what type of object was created/deleted/updated, and the result of the database query
    - White space in `controller` files
      - There is a new line which function defintions
      - In a function, there is a new line after the validation/error handling section
  - Model Styling
    - Parameters for `model` functions will be in camel case
      - Exception, "Id" will be written as "ID". e.g. `userID` instead of `userId`
  - Route Styling
    - In `route` files, endpoints will be in the order of `GET`, `POST`, `PUT`, and `DELETE`
  

  
  

  
  