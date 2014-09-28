# geocell

A simple REST api that returns geocells for specific US zip codes.

Shape files are obtained from [ftp://ftp2.census.gov/geo/tiger/TIGER2013/ZCTA5/](ftp://ftp2.census.gov/geo/tiger/TIGER2013/ZCTA5/) for specific zip codes and converted into a minified json for ease of use:

    { zip: zip_code, coordinates: [array of coordinates of the zip polygon] }

Installing and running:

    npm install
    foreman start

Use the following example url to see a list of geocells for a zip:

[http://localhost:3000/zip/43451](http://localhost:3000/zip/43451)
