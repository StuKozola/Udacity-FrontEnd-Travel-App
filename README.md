# Project 5: Travel App
__Udacity Front End Developer Nanodegree Program__

Project 5 todo

# Example Screenshot
![Screenshot](/src/client/img/screenshot.png)

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

You will need to create a `.env` file that contains an API key for [MeaningCloud's sentiment analysis API](https://www.meaningcloud.com/developer/sentiment-analysis/doc) and set the port you want the server to run in.  Example is shown below.

```
GEONAMES_USERNAME = <username>
WEATHERBIT_API_KEY= <api key>
PIXABAY_API_KEY= <api key>
ROADGOAT_API_KEY= <api key>
ROADGOAT_SECRET_KEY= <secret key>
PORT='8080'
```

Once installation is complete, you can use the run scripts to build and test in different enviroments.

For development:
```bash
npm run build-dev
```

For a production enironment:
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
