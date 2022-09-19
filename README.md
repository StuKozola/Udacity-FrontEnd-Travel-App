# Project 5: Travel App
__Udacity Front End Developer Nanodegree Program__

This is a capstone project for the Udacity Front End Developer Nanodegree Program. The project is a travel app that obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.  

# Dependencies
The exeternal APIs used are the [Geonames API](http://www.geonames.org/export/web-services.html), the [Weatherbit API](https://www.weatherbit.io/api), and the [Pixabay API](https://pixabay.com/api/docs/).  You will need to create accounts with each of them to build and run the app.

The project also uses the [Express](https://expressjs.com/) framework for Node.js, and the [Webpack](https://webpack.js.org/) module bundler.
    

# Example Screenshots
![Screenshot](/src/client/img/screenshot.gif)
![Screenshot Mobile](/src/client/img/screenshot_mobile.gif)

# Installation
To install the code, use `git clone` to copy the repo locally.  Alternatively you can download the files from this repository.

From the root folder in the project, install nodejs and node packager manager.  For example:
```bash
# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Consult the [npm docs](https://nodejs.org/en/download/package-manager/) for installation on other platforms.

Then  `cd` into the root project folder and run:
- `npm install`

You will need to create a `.env` file that contains an API keys and optionaly set the port you want the server to run in.  Example is shown below.

```
GEONAMES_USERNAME = <username>
WEATHERBIT_API_KEY= <api key>
PIXABAY_API_KEY= <api key>
PORT='8080'
```

Once installation is complete, you can use the run scripts to build and test in different enviroments.

For development:
```bash
npm run build-dev
```

For a production environment:
```bash
npm run build-prod
npm run start
```

To run the jest tests:
```bash
npm run test
```

Example test result:
![Screenshot](/src/client/img/test_results.png)

# License
MIT License - Copyright (c) 2022 Stuart Kozola
