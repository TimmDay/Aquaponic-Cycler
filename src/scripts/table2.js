
// generates a table that represents the last 45 data entries (stored in global_data_entries)
const column_headers = ['Date', 'Time', 'pH', 'Ammonia', 'Nitrite', 'Nitrate', 'Notes','Edit']; //8

const generateTableHtml = (global_data_entries) => {

    // make sure to remove the old table html to make space for the updated one
    const oldTable = document.getElementById('table_container');
    while (oldTable.firstChild) oldTable.removeChild(oldTable.firstChild);

    //build the table html with new data
    let updated_table = document.createElement('table');
    updated_table.setAttribute('id', 'cycling-table');
    updated_table.setAttribute('style', 'width:100%');

    document.getElementById('table_container').appendChild(updated_table); //put it in html

    const header = document.createElement('tr');
    updated_table.appendChild(header);

    // generate table headers
    column_headers.forEach((col) => {
        const title = document.createElement('th');
        title.setAttribute('class', 'table-title');
        title.innerHTML = col;
        header.appendChild(title);
    });

    // populate table data from existing sources
    // db call
    global_data_entries.forEach((entry) => {
        // validate entry somehow
        // create append row
    });
};

generateTableHtml(global_data_entries);

//         const row = document.createElement('div'); // create div to hold the row
//         row.setAttribute('class','flex-container chart-container');
//
//         // loop to create the items
//         for (let j=0; j < columns && lines.length > 0; j++) {
//             const item = document.createElement('div');
//             item.setAttribute('class','flex-item');
//
//             // if we need to add invisible placeholder items at end
//             if (linesRemaining - numInvisibleItemsToCompleteLastRow <= 0) {
//                 item.setAttribute('style','visibility:hidden');
//             }
//
//             const del = document.createElement('i');
//             const currentLine = msf[fab].lines[msf[fab].lines.length - (linesRemaining - numInvisibleItemsToCompleteLastRow)];
//             del.setAttribute('id',`${currentLine}Del`); //W730AADel
//             del.setAttribute('class','deliveryindicator');
//             item.appendChild(del);
//
//             const tinyTitle = document.createElement('p');
//             tinyTitle.setAttribute('id',`${fab.slice(0,4)}${currentLine}`); //id is first 4 chars of fab name, then line name
//             tinyTitle.setAttribute('class','tiny-title');
//             item.appendChild(tinyTitle);
//
//             const canvas = document.createElement('canvas');
//             canvas.setAttribute('id',`chart${currentLine}`); // chartW730A4
//             item.appendChild(canvas);
//
//             row.appendChild(item);
//
//             linesRemaining--;
//         }
//         document.getElementById(`${fab}-dashboard`).appendChild(row);
