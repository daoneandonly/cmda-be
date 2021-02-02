# cmda-be
Hi! Thanks for looking through this repo. This is a repo made for the progress of the course of cmda-be.

## How to run
Currently this repo has a `index.js` file that can be run through node, and a seperate `index.html` file.

First of all,clone this project by running this in your terminal

```bash
git clone https://github.com/daoneandonly/cmda-be
```

Then move into the project
```bash
cd cmda-be
```

### Running the Node script

First install the project by running
```bash
npm install
```
Now run node `start` script which will run `index.js`. Do this by running the following command

```bash
node index.js
```

This will return a nice little joke, provided by the [one-liner-joke](https://www.npmjs.com/package/one-liner-joke) npm package.

### Serving the html page
I'm using the package [Browsersync](https://browsersync.io/) to serve the project.

```bash
npm run start 
```

This will run the command `browser-sync start -s` which will serve our `index.html` file