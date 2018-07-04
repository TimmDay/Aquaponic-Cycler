
// generates a table that represents the last 45 data entries (stored in global_data_entries)
const column_headers = ['Date', 'Time', 'pH', 'Ammonia', 'Nitrite', 'Nitrate', 'Notes','Edit']; //8

const generateTableHtml = () => {

    // make sure to remove the old table html to make space for the updated one
    const oldTable = document.getElementById('table_container');
    while (oldTable.firstChild) oldTable.removeChild(oldTable.firstChild);

    //build the table html with new data
    let updated_table = document.createElement('table');
    updated_table.setAttribute('id', 'cycling-table');
    updated_table.setAttribute('style', 'width:100%');

    document.getElementById('table_container').appendChild(updated_table); //put it in html

    const header = document.createElement('thead');
    updated_table.appendChild(header);

    // generate table headers
    column_headers.forEach((col) => {
        const title = document.createElement('th');
        title.setAttribute('class', 'table-title');
        title.innerHTML = col;
        header.appendChild(title);
    });

    const body = document.createElement('tbody');
    updated_table.appendChild(body);


    // async. make data populated before calling. call in promise within global-data.ja
    // console.log(global_data_arrays.sys1.id);

    // global_data_arrays.sys1.id.push("HIIIIIIII");
    // global_data_arrays.sys1.id.push("aergaerg");
    // console.log(global_data_arrays.sys1.id);

    global_data_arrays.sys1.id.forEach((entry, idx) => {
        // console.log(entry);

        // validate entry somehow
        // create append row
        const row = document.createElement('tr');
        row.setAttribute('class', 'table-row');
        body.appendChild(row);

        const date = document.createElement('td');
        date.setAttribute('class', 'table-data');
        date.textContent = global_data_arrays.sys1.dates[idx];
        row.appendChild(date);

        const time = document.createElement('td');
        time.setAttribute('class', 'table-data');
        time.textContent = global_data_arrays.sys1.times[idx];
        row.appendChild(time);

        const pH = document.createElement('td');
        pH.setAttribute('class', 'table-data');
        pH.textContent = global_data_arrays.sys1.pH[idx];
        row.appendChild(pH);

        const amm = document.createElement('td');
        amm.setAttribute('class', 'table-data');
        amm.textContent = global_data_arrays.sys1.ammonia[idx];
        row.appendChild(amm);

        const nitrite = document.createElement('td');
        nitrite.setAttribute('class', 'table-data');
        nitrite.textContent = global_data_arrays.sys1.nitrite[idx];
        row.appendChild(nitrite);

        const nitrate = document.createElement('td');
        nitrate.setAttribute('class', 'table-data');
        nitrate.textContent = global_data_arrays.sys1.nitrate[idx];
        row.appendChild(nitrate);

        const note = document.createElement('td');
        note.setAttribute('class', 'table-data');
        note.textContent = global_data_arrays.sys1.notes[idx];
        row.appendChild(note);

    });
};


// file called in main(global-data)





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
