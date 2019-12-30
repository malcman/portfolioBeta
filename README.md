# Malcolm Maturen Portfolio
This is a Flask/React app detailing my experience and art. The deployed site can be found at [malc.io](malc.io). Though its use is limited to most people, follow the below instructions if you wish to run it locally and poke around the code.

## Downloading
Assuming you have git installed, clone this repo with the following terminal command in the local directory of your choice.
```
$ git clone https://github.com/malcman/portfolioBeta
```

## Virtual Environment
If you do not already the ```virtualenv```  python package, install it with the following terminal command:
```
$ pip install virtualenv
```

Navigate to the project directory in terminal. Intialize a new virtual environment:
```
$ virtualenv env
```
... and activate it.
```
$ source env/bin/activate
```
Install python dependencies:
```
$ pip install -e .
```
and the same with JavaScript dependencies. Using npm:
```
$ npm install .
```

## Executable Permissions
There are a few bash scripts in the `bin/` folder that make development a little easier. It is likely that you will need to add executable permissions the first time you run them. This is done with the following command format:
```
$ chmod +x bin/nameOfScript
```
It can then be ran like so:
```
$ ./bin/nameOfScript
```

## Transpiling JavaScript
If you make any edits to the .jsx files and want to see them reflected, you will also need to transpile the .jsx files into JavaScript that all browsers can understand. There are many ways to do this, but I used [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/).

### Watching (Development)
As long as these dependencies are properly installed, you can open a terminal tab in the project directory and run the following command to watch for changes. This is helpful during development.
```
$ npm run watch
```
Alternatively, run the simple `bin/watchReact` script in a dedicated terminal tab.
```
$ ./bin/watchReact
```
### Production
For production-ready js transpiling, execute the following command once:
```
$ npm run build
```

## Running the Application
Having read all of the above text like we all do always, making sure that all dependencies are installed, you can run the development server with the following command:
```
$ ./bin/runServer
```
See *Executable Permissions* above if you get a permissions error.

## Shutdown

Enter `Ctrl+C` to stop the application. Enter the following command to deactivate the virtual environment.
```
$ deactivate
```
