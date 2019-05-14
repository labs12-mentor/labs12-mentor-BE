# Labs 12: MentorMatch - Backend ![CodeBuild Badge]()

A Node based backend for the LambdaSchool Labs12 Project **Mentor Program**

---

![MentorMatchr](https://i.imgur.com/OVDYokb.png)

## Team
|   [**bummings**](https://github.com/bummings)  |   [**cwright0428**](cwright0428)   |    [**Estrax**](https://github.com/Estrax)    |   [**jdspell**](https:/github.com/jdspell)  | [**JorPoon**](https://github.com/JorPoon) | [**khamp19**](https://github.com/khamp19) | [**tfolbrecht**](https://github.com/tfolbrecht) |
|:----------------:|:----------------:|:---------------:|:---------------:|:---------------:|:---------------:|:---------------:| 
| [<img src="https://github.com/bummings.png?s=80" width="80">](https://github.com/bummings) | [<img src="https://github.com/cwright0428.png?s=80" width="80">](https://github.com/cwright0428)  | [<img src="https://github.com/Estrax.png?s=80" width="80">](https://github.com/Estrax) | [<img src="https:/github.com/jdspell.png?s=80" width="80">](https:/github.com/jdspell) | [<img src="https://github.com/JorPoon.png?s=80" width="80">](https://github.com/JorPoon) | [<img src="https://github.com/khamp19.png?s=80" width="80">](https://github.com/khamp19) | [<img src="https://github.com/tfolbrecht.png?s=80" width="80">](https://github.com/tfolbrecht) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/bummings) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/cwright0428) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/Estrax) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/jdspell) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/JorPoon) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/khamp19) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/tfolbrecht) |

# Index
[Resources](#resources)
[Running](#running)
[Third-Party APIs](#third-party)


## Resources
|Project Management|
| :---------------:| :---------------:|
| [Trello Board](https://trello.com/b/sPX3FEno/labs12-mentor-program) |
| [Product Canvas](https://docs.google.com/document/d/1wLlPJxiPSVHkUoUThSp11yk5ZwKqD3c81FDu_UEXrVs/edit#heading=h.crmhbig18nld) |
| [Database Diagram](https://dbdiagram.io/d/5cc0e72ef7c5bb70c72fbf83) |
| [Git Workflow](https://www.notion.so/Git-Workflow-34f9b468dcf74a669aff0d3797870d37) |
| Discussion on [Slack](https://lambdaschoolstudents.slack.com/messages/GJ2DGUVGU/details/) |
All Backend associate Trello cards should be tagged Dark Blued

---
## Running

### `npm start`

Runs the app in the development mode.

### `npm server`

Launches the test runner in the interactive watch mode.

### `npm run test`

Builds the jests tests in `--watch --verbose` mode.

---
## Environment Variables

##### index.js

`PORT` : Port Node Opens

##### knexfile.js

`DB_HOST` : Database URL

`DB_NAME` : Postgres database name

`DB_USER` : Postgres user name

`DB_PASS` : Postgres Password

##### dbConfig.js

`APP_ENV` : Test/ Development/ Production, switch for Database

##### authenticate.js / generateToken.js

`SECRET_KEY` : Secret key used to generated JWT

##### passport.js

`GITHUB_CLIENT_ID` : Used in GitHub Oauth2

`GITHUB_CLIENT_SECRET` : Used in GitHub Oauth2

`GITHUB_CALLBACK_URL` : Used in GitHub Oauth2


## Third-Party APIs

### GitHub identity service

Used for Oauth