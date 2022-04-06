Site: https://json-generator.com/

# User

```js
[
  "{{repeat(100)}}",
  {
    username:
      "{{firstName().toLowerCase()}}{{surname().toLowerCase()}}{{integer(100,999)}}",
    email: "{{email()}}",
    password: "password",
    avatar: "https://source.unsplash.com/random/100x100",
    trelloToken: "{{guid()}}",
    trelloId: "{{guid()}}",
    role: "user",
  },
];
```

# Project

```js
[
  "{{repeat(200)}}",
  {
    name: "{{firstName()}} {{surname()}} {{lorem(1, 'words').toLowerCase()}} {{company()}}",
    trelloBoardId: "{{guid()}}",
    lastAccessed:
      '{{date(new Date(2019, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss")}}Z',
  },
];
```

# Member

```js
[
  "{{repeat(1000)}}",
  {
    overallPoint: "{{integer(80,100)}}",
    desiredReward: '{{lorem(2, "words")}}',
    upperBoundary: "{{integer(80,100)}}",
    lowerBoundary: "{{integer(10,30)}}",
  },
];
```
