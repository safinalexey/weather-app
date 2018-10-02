# WeatherApp

Built by Aleksei Safin

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:9000/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Thoughts and tradeoffs

I decided to use geolocation service in browser to get position of the user and using those coordinates query weather API to get
weather by coordinates. Also I provided form to search weather in specified city which handles errors. One thing that could be done
better here - I could have included ability to search by ZIP code for weather in US.

At the startup after browser got users' position application makes two requests to weather API - to get current weather and 5 day forecast.
The problem here was if today is late enough in the forecast todays' weather won't be coming - and that's why we need second request to weather.

I was thinking of whether to use Redux pattern built-in to Angular with ngrx package in order to keep data in one place and maintain one way dataflow,
but decided not to bc of app size and scaffolding expenses comparing to outcomes.
Codewise I'd create query builder for API requests in order not keep API string as a string in every http request, but to have a method that could
build me a string based on params I pass to function.
Also I'd add a message to user to type city name manually if browser takes to long to determine user location.

Having more time I'd like to add display not only the temperature itself, but weather conditions like clouds/wind and corresponding backgrounds and icons, as well as
keeping user selection of measurement units(also detecting preferred units) and last detected city to serve data faster.
