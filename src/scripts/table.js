/**
 * Created by DAY7RT on 22.05.2018.
 */

console.log('js connected');


//Create Date Editor
const dateEditor = (cell, onRendered, success, cancel) => {
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass the succesfully updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell

    //create and style editor
    var editor = $("<input type='date'></input>");
    editor.css({
        "padding":"3px",
        "width":"100%",
        "box-sizing":"border-box",
    });

    //Set value of editor to the current value of the cell
    editor.val(moment(cell.getValue(), "DD/MM/YYYY").format("YYYY-MM-DD"));

    //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
    onRendered(function(){
        editor.focus();
        editor.css("height","100%");
    });

    //when the value has been set, trigger the cell to update
    editor.on("change blur", function(e){
        success(moment(editor.val(), "YYYY-MM-DD").format("DD/MM/YYYY"));
    });

    //return the editor element
    return editor;
};

//create autocomplete editor
const autocompEditor = (cell, onRendered, success, cancel) => {
    //create and style input
    let input = $("<input type='text'/>");

    //setup jquery autocomplete
    input.autocomplete({
        source: ["United Kingdom", "Germany", "France", "USA", "Canada", "Russia", "India", "China", "South Korea", "Japan"]
    });

    input.css({
        "padding":"4px",
        "width":"100%",
        "box-sizing":"border-box",
    })
        .val(cell.getValue());

    onRendered(function(){
        console.log('rendered');
        input.focus();
        input.css("height","100%");

    });

    //submit new value on blur
    input.on("change blur", function(e){
        if(input.val() != cell.getValue()){
            success(input.val());
        }else{
            cancel();
        }
    });

    //submit new value on enter
    input.on("keydown", function(e){
        if(e.keyCode == 13){
            input.css("color","red");
            success(input.val());
        }

        if(e.keyCode == 27){
            input.css("color","red");
            cancel();
        }
    });
    return input;
};

//Build Tabulator
$("#example-table").tabulator({
    layout:"fitColumns",
    height:"311px",
    columns:[
        {title:"Date", field:"date", align:"center", sorter:false,  editor:dateEditor},
        {title:"pH", field:"pH", align:"center", width:130, editor:autocompEditor},
        {title:"Ammonia", field:"ammonia", align:"center",   editor:true, editorParams: {max: 20}},
        {title:"Nitrite", field:"nitrite", align:"center", editor:true},
        {title:"Nitrate", field:"nitrate", align:"center", editor:true},
    ],
    cellEdited:function(cell){
        console.log('cell edited');
    },
});


let data_entries = [
    {
        id:0, date: global_data.sys1.dates[0],
        pH: global_data.sys1.pH[0], ammonia: global_data.sys1.ammonia[0],
        nitrite: global_data.sys1.nitrite[0], nitrate: global_data.sys1.nitrate[0]
    },
    {
        id:1, date: global_data.sys1.dates[1],
        pH: global_data.sys1.pH[1], ammonia: global_data.sys1.ammonia[1],
        nitrite: global_data.sys1.nitrite[1], nitrate: global_data.sys1.nitrate[1]
    },
    {
        id:2, date: global_data.sys1.dates[2],
        pH: global_data.sys1.pH[2], ammonia: global_data.sys1.ammonia[2],
        nitrite: global_data.sys1.nitrite[2], nitrate: global_data.sys1.nitrate[2]
    },
    {
        id:3, date: global_data.sys1.dates[3],
        pH: global_data.sys1.pH[3], ammonia: global_data.sys1.ammonia[3],
        nitrite: global_data.sys1.nitrite[3], nitrate: global_data.sys1.nitrate[3]
    },
    {
        id:4, date: global_data.sys1.dates[4],
        pH: global_data.sys1.pH[4], ammonia: global_data.sys1.ammonia[4],
        nitrite: global_data.sys1.nitrite[4], nitrate: global_data.sys1.nitrate[4]
    },
    {
        id:5, date: global_data.sys1.dates[5],
        pH: global_data.sys1.pH[5], ammonia: global_data.sys1.ammonia[5],
        nitrite: global_data.sys1.nitrite[5], nitrate: global_data.sys1.nitrate[5]
    },
    {
        id:6, date: global_data.sys1.dates[6],
        pH: global_data.sys1.pH[6], ammonia: global_data.sys1.ammonia[6],
        nitrite: global_data.sys1.nitrite[6], nitrate: global_data.sys1.nitrate[6]
    },
    {
        id:7, date: global_data.sys1.dates[7],
        pH: global_data.sys1.pH[7], ammonia: global_data.sys1.ammonia[7],
        nitrite: global_data.sys1.nitrite[7], nitrate: global_data.sys1.nitrate[7]
    },
    {
        id:8, date: global_data.sys1.dates[8],
        pH: global_data.sys1.pH[8], ammonia: global_data.sys1.ammonia[8],
        nitrite: global_data.sys1.nitrite[8], nitrate: global_data.sys1.nitrate[8]
    },
    {
        id:9, date: global_data.sys1.dates[9],
        pH: global_data.sys1.pH[9], ammonia: global_data.sys1.ammonia[9],
        nitrite: global_data.sys1.nitrite[9], nitrate: global_data.sys1.nitrate[9]
    },
];

// load sample data into the table
$("#example-table").tabulator("setData", data_entries);

document.getElementById('btn__csv').addEventListener('click', () => {
    $("#example-table").tabulator("download", "csv", "data.csv", {delimiter:"."});
});

document.getElementById('btn__xlsv').addEventListener('click', () => {
    $("#example-table").tabulator("download", "xlsx", "data.xlsx", {sheetName:"MyData"});
});

