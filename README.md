# Labs 12: MentorMatch - Backend

A Node based backend for the LambdaSchool Labs12 Project "Mentor Program"

![CodeBuild Badge](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiUndoSlVJb01xbFV2OFVUYmtkNS94SmJFbXgxNTE5YlYyeGlBRjAwRUlwVExUNXRrcy9vaTEwNk0vVUhjcjVxQStqUWg5NG9YWjc0QURCTDZoY2hOWW5RPSIsIml2UGFyYW1ldGVyU3BlYyI6IkFQVE1PV1crV0tFZ0xvbEQiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

---

### `npm start`

Runs the app in the development mode.

### `npm server`

Launches the test runner in the interactive watch mode.

### `npm run test`

Builds the jests tests in `--watch --verbose` mode.

---

## Resources

### [Database Diagram](https://dbdiagram.io/d/5cc0e72ef7c5bb70c72fbf83)
### [Trello Board](https://trello.com/b/sPX3FEno/labs12-mentor-program)
### [Product Canvas](https://docs.google.com/document/d/1wLlPJxiPSVHkUoUThSp11yk5ZwKqD3c81FDu_UEXrVs/edit#heading=h.crmhbig18nld)
### [Git Workflow](https://www.notion.so/Git-Workflow-34f9b468dcf74a669aff0d3797870d37)

All Backend associate Trello cards should be tagged Dark Blue

![Light Blue Trello label](https://s3.amazonaws.com/labs.mentor.frontend/backendtagtrello.png)

Discussion on [Slack](https://lambdaschoolstudents.slack.com/messages/GJ2DGUVGU/details/)

### Directory Structure and Style

```.
├── index.js
├── knexfile.js
├── LICENSE
├── node_modules
├── package.json
├── README.md
├── src
│   ├── controllers
│   │   ├── administrators.js
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── experiences.js
│   │   ├── index.js
│   │   ├── matches.js
│   │   ├── meetings.js
│   │   ├── menteeProfiles.js
│   │   ├── mentorProfiles.js
│   │   ├── notifications.js
│   │   ├── organizations.js
│   │   ├── owners.js
│   │   └── users.js
│   ├── database
│   │   ├── dbConfig.js
│   │   ├── dev.sqlite3
│   │   ├── helpers
│   │   │   ├── administrators.js
│   │   │   ├── db.js
│   │   │   ├── experiences.js
│   │   │   ├── matches.js
│   │   │   ├── meetings.js
│   │   │   ├── menteeProfiles.js
│   │   │   ├── mentorProfiles.js
│   │   │   ├── notifications.js
│   │   │   ├── organizations.js
│   │   │   ├── owners.js
│   │   │   └── users.js
│   │   ├── migrations
│   │   │   ├── 20190426144036_owners.js
│   │   │   ├── 20190426144037_administrators.js
│   │   │   ├── 20190426144241_organizations.js
│   │   │   ├── 20190426144545_users.js
│   │   │   ├── 20190426144834_notifications.js
│   │   │   ├── 20190426145035_mentorprofiles.js
│   │   │   ├── 20190426145246_menteeprofiles.js
│   │   │   ├── 20190426145433_experiences.js
│   │   │   ├── 20190426145510_matches.js
│   │   │   └── 20190426145759_meetings.js
│   │   └── seeds
│   │       ├── 001-owners.js
│   │       ├── 002-administrators.js
│   │       ├── 003-organizations.js
│   │       ├── 004-users.js
│   │       ├── 005-notifications.js
│   │       ├── 006-mentors.js
│   │       ├── 007-mentees.js
│   │       ├── 008-experiences.js
│   │       ├── 009-matches.js
│   │       └── 010-meetings.js
│   ├── middleware
│   │   ├── authenticate.js
│   │   ├── generateToken.js
│   │   └── serverMiddleware.js
│   ├── routes
│   │   ├── administrators.js
│   │   ├── auth.js
│   │   ├── experiences.js
│   │   ├── index.js
│   │   ├── matches.js
│   │   ├── meetings.js
│   │   ├── menteeProfiles.js
│   │   ├── mentorProfiles.js
│   │   ├── notifications.js
│   │   ├── organizations.js
│   │   ├── owners.js
│   │   └── users.js
│   ├── server.js
│   ├── tests
│   │   ├── auth.test.js
│   │   └── meetings.test.js
│   └── validators
│       ├── api.js
│       ├── auth.js
│       ├── experiences.js
│       ├── index.js
│       ├── matches.js
│       ├── meetings.js
│       ├── menteeProfiles.js
│       ├── mentorProfiles.js
│       ├── notifications.js
│       ├── organizations.js
│       ├── roles.js
│       └── users.js
└── yarn.lock

10 directories, 82 files
```