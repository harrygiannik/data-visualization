# data-visualization
## Description
Data visualization using [d3.js](https://d3js.org/), [Node.js](https://nodejs.org/en/) and [mysql](https://www.mysql.com/).

This project reads data from a database and creates bar/line charts and scatter plots. It was created for educational puproses, under the course of [cs.uoi.gr/~pvassil/courses/db_III/](http://www.cs.uoi.gr/~pvassil/courses/db_III/) 

## Installation
* Install mysql-server, apache2, mysql-workbench
* Install nodejs and node package manager (npm)
* run `npm install mysql` on terminal

## Usage
1. start mysql-workbench
2. start mysql server
3. once you have downloaded everything from this repository,
on MySQL-workbench go to file/Open Model and select data_schema.mwb or click open SQL script, select create_db.sql and run it.
4. run input_data.sql on workbench.
5. run `node app.js` on terminal.
6. enter your mysql password.
7. open a browser and go to [localhost:3011](http://localhost:3011/) .
8. now you are ready and you can select countries and indicators to see some graphs.

## Contributors
* [Charis Giannikopoulos](https://github.com/harrygiannik)
* [Nick Orestis Ntallas](https://github.com/nontallas)
* [Aris Siozos](https://github.com/ariss95)

## Data Source
[World Bank Data](http://data.worldbank.org/)

## Screenshots
![homepage](/images/homepage.png)


![choosechart](/images/choosechart.png)


![barchart](/images/barchart.png)


![linechart](/images/linechart.png)
