# todo
- replace CDN jquery script tags with downloaded optimised code in the libs folder
- replace CDN tabulator link and script tags with local downloaded version
- replace chart.js CDN script tag with local downloaded version

- use import/export or whatever to merge all the js to one file, and then only have one script tag in html

- import moment js, saved locally
- use moment to automatically save the time that data is added

- option for 12 or 24 hour time (changes moment query)
- date format option: DD/MM/YYY or MM/DD/YYY

- BUG why does chart only display when dev tools open?
related: Chart.bundle.js:8938 Uncaught TypeError: Cannot read property 'transition' of null

CHART
- make chart lines not over curve
- left and right y axis, right side just ph
- split legend to left and right
- hook the table up to the data
- user enters data into the table, it updates the global object, the graph adjusts

TABLE
- validation. only numbers for data columns
- validation. make date auto populate, otherwise stick to same format
- show data in reverse order such that most recent entry is first
- new entries are added to the top

-BUG can type 'e' in number cells

- button: new entry. 

## DOCS
[moment js](https://momentjs.com/docs/#/displaying/)