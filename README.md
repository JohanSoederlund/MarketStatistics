# CONFLICT STATISTICS

This application is a SQL database for macro-statistics for countries (fatalities, population and GDP), combined with conflict data (wars, uprisings, demonstrations). Reason for my idea is to get interesting statistical causalities between conflicts and other data. It will also be a pure database for reported conflicts around the world.

## Installation
1. Clone the project.
2. Download and install [MySQL](https://dev.mysql.com/downloads/)
3. Download [data set](https://we.tl/t-MJmDxslnIu) and move files to ConflictStatistics/datasets
4. Change credentials in FileManager and DatabaseConnection
    * const host = "localhost";
    * const user = "root";
    * const password = "";
5. Run 'Node server/FileManager
6. Run 'Node server/websocket
7. Run npm start
8. Open [ConflictStatistics](localhost:3000) in browser

## Data source
* [The correlates of war project](http://www.correlatesofwar.org/data-sets/world-religion-data/wrp-national-data-1/view) for religion statistics
* [ACLED](https://www.acleddata.com/) for conflict statistics
* [World bank](https://data.worldbank.org/) for gdp and population statistics


# Other resources

* [erdplus](https://erdplus.com) for modeling
* [ER model](https://raw.githubusercontent.com/JohanSoederlund/conflictstatistics/master/ER.png)
* [Video presentation](https://www.youtube.com/channel/UCJwDeeR-CbWUAGIemcENFww?view_as=subscriber)

# React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
