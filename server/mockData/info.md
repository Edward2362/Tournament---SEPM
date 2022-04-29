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
    avatarUrl: "https://source.unsplash.com/random/100x100",
    trelloToken: "{{guid()}}",
    trelloId: "{{guid()}}",
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
    lastAccessed: [],
    upperBoundary: "{{integer(80,100)}}",
    lowerBoundary: "{{integer(10,30)}}",
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
  },
];
```
