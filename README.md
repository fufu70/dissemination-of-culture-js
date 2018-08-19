# dissemination-of-culture-js

Builds a cultural map and runs through [The Dissemination of Culture](http://users.softlab.ntua.gr/~brensham/CourseSoc/Axelrod1997.pdf) simulation. The culture set is provided as a two dimensional array of cultures. A culture is simply a array of integers.

## How to use

We used node to run the project

```
$ node index.js
```

To increase the size of the map (by default the map is of size 5 in height and width) simply pass in an integer as a parameter.

```
$ node index.js 100
```

To increase the amount of iterations (by default the iteration amount is 100) simply pass in the iteration amount as a second parameter.

```
$ node index.js 5 1000
```

To make the culture matchmaking more flexible, simply increase the min match value in the third parameter. By default the min match value is 0, the maximum match value possible is 10.

```
$ node index.js 5 1000 3
```

To make the culture matchmaking more flexible, simply increase the max match value in the third parameter. By default the max match value is 10, the maximum match value possible is 10.

```
$ node index.js 5 1000 3 6
```

## Requirements

This project uses (node)[https://nodejs.org/en/].