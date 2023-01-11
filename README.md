# SimplePoll

App is hosted on `https://startling-toffee-dd4016.netlify.app`

If you want to test the app locally please pull the project, run:

```
npm i
npm start
```

Navigate to `http://localhost:4200/`

![Main page](src\assets\readme\main-page.png)

## Development details

The app is using `changeDetection: ChangeDetectionStrategy.OnPush` for all components for better performance, hence all data in the app is immutable.

`PrimeNG` components library was used for visial part and building chart.

## e2e tests

If you want to run tests locally please run:

```
npm start
```

And in parallel:

```
npm run open:cypress
```

Main blocks are covered such as:

1. Answers form

2. Votes

3. Reset

4. Question input
