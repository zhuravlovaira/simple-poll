# SimplePoll

App is hosted on `https://startling-toffee-dd4016.netlify.app`

If you want to test the app locally please pull the project, run:

```
npm i
npm start
```

Navigate to `http://localhost:4200/`

![main-page](https://user-images.githubusercontent.com/17531782/211712677-c202e644-bdd7-43f3-99d1-865b0321f32a.png)

## Development details

The app is using `changeDetection: ChangeDetectionStrategy.OnPush` for all components for better performance, hence all data in the app is immutable.

`PrimeNG` components library was used for visial part and building chart.

## Unit tests

If you want to run unit tests locally please run:

```
npm run test
```

## e2e tests

If you want to run e2e tests locally please run:

```
npm start
```

And in parallel:

```
npm run open:cypress
```

Main blocks are covered such as:

1. Answers form

https://user-images.githubusercontent.com/17531782/211712543-d8bc38c4-604e-480f-9583-55dd01abbc33.mp4

2. Votes

https://user-images.githubusercontent.com/17531782/211712713-1a1b17ab-b82f-4ee8-856d-cdba63ef2350.mp4

3. Reset

https://user-images.githubusercontent.com/17531782/211712748-4c0e9a0a-9ea5-4daa-a9a2-6c3b544c0ff0.mp4

4. Question input

https://user-images.githubusercontent.com/17531782/211712772-e00a58bc-07cd-45c9-bef6-4c5769f7abf6.mp4
