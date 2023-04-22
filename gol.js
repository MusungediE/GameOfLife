
let columnSize = 25;
let rowSize = 25;
let interval;
let gridArr = new Array(rowSize);
let gridArrCpy = new Array(rowSize);
let score = 0;
let time = 0;

//Function that resets the grid

function reset() {
    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < columnSize; j++) {
            gridArr[i][j] = 0;
            gridArrCpy[i][j] = 0;
        }
    }
    generation = 0;
    score =0;
    document.getElementById("generationNum").innerHTML = "Generation: " + generation;
    document.getElementById("scoreContainer").innerHTML = score;
    score =0;
    time=0;
}

// Start onload
function init() {
    newTable();
    make2DArray();
    reset();
    countTime();
}

//Place content on load
window.onload = init;

//This function creates our grid layout in the div named "grid"
function newTable() {
    var table = document.createElement("table");
    table.setAttribute("class", "tab");

     //Row Iteration
    
    for (let i = 0; i < rowSize; i++) {
        let newRow = document.createElement("tr");  //Creation of a new row based on the variables

        //Column Iteration

        for (let j = 0; j < columnSize; j++) {//
            let newColumn = document.createElement("td"); 
            newColumn.setAttribute("class", "dead"); //Use dead class as to basically make an empty grid on creation
            newColumn.setAttribute("id", i + "|" + j); //Give an ID to the exact position of cell in grid
            newColumn.onclick = gridClick; //Call the gridClick function for on-clicks
            newRow.appendChild(newColumn);  // Append new column element to the new row
        }
        //After end of column loop, append the the rows and columns to the table

        table.appendChild(newRow);
    }
        //Apply the entire table to the html div element "grid"
        
    document.getElementById('grid').appendChild(table);
    }
    function make2DArray() {
        for (let i = 0; i < rowSize; i++) {
            gridArr[i] = new Array(columnSize);
            gridArrCpy[i] = new Array(columnSize);
        }
    }

    function gridClick() {
        let rowcol = this.id.split("|"); //Getting the id when called and splitting into an array of two elements
        let r = rowcol[0];  //get first character of id
        let c = rowcol[1]; //get last chaarcter of id;
        var getClass = this.getAttribute("class");

        //Checking if the class is dead or alive. 
        //If alive, change it to dead on click.
        //If dead, change it to alive on click. 

        if(getClass.indexOf("alive") > -1) {
            this.setAttribute("class", "dead");
            gridArr[r][c] = 0; //the dead cell will be initialized as 0

            score -= 1; //score will decrease
        } else {
            this.setAttribute("class", "alive");
            gridArr[r][c] = 1; //the alive cell will be initialized as 1

            score += 1;
        }
        
    }


// Function when the start button is clicked
var generation = 0;
function start() { 
    generation++;
    document.getElementById("scoreContainer").innerHTML = score;
    document.getElementById("generationNum").innerHTML = "Generation: " + generation;
    nextGeneration(gridArr);
    interval = setTimeout(clicks, 500); //keeps pressing the button every 0.5 seconds
    setTimeout(interval);
    document.getElementById("pause").style.opacity = 1;  //Show the pause button when start is clicked
}


//Automated clicking function

function clicks(){
    document.querySelector('#start').click();
}

//Function to pause the game
function pause(){
    clearTimeout(interval);  //Stops the button clicks and pauses the game
}

function nextGeneration(gridArr) {
    for (var i = 0; i < rowSize; i++) {
        for (var j = 0; j < columnSize; j++) {
            rules(i, j);
        }
    }
    
    //Use this function for swapping the two grids and resetting the other
    swapGrids();
    // Use this function to display the alive cells based on the value "1"
    gridUpdate();
}


function resetBtn(){
    alert("Cleared");
    clearTimeout(interval);
    var aliveCells = document.getElementsByClassName("alive");

    //Getting all the elements that are alive and setting it to dead class
    for(let i = 0; i < rowSize; i++){
        for(let j = 0; j < columnSize; j++){
            document.getElementById(i + "|" + j).setAttribute("class", "dead");
        }
    }
    //Call reset button to make gridArr 0 in all rows and columns
    reset();
    
}

//Function that only presses the button once for each generation

function increment1Btn(){
    this.gridArr = nextGeneration(gridArrCpy); 
    generation+= 1;
}

function increment23Btn(){
    for(let i=0; i<23; i++){
        this.gridArr = nextGeneration(gridArrCpy);
    }
    generation +=23;

    
}


function optionsFunc(){
    //Clear every part of the grid when a option is selected
    for(let i = 0; i < rowSize; i++){
        for(let j = 0; j < columnSize; j++){
            document.getElementById(i + "|" + j).setAttribute("class", "dead");
            gridArr[i][j] = 0;
        }
    }
    

    /*
    This section is specifically for the "Block" Pattern
    */

    let pattern = document.getElementById("pattern");
    if(pattern.value == "block"){
   
        let row = Math.round(rowSize/2);
        let col = Math.round(columnSize/2);
        for(let i = 0; i < columnSize; i++){
            document.getElementById(0 + "|" + i).setAttribute("class", "alive");
            gridArr[0][i] = 1;
        
        }  
        let count = 0;
    
        for(let i = row; i < row + 2; i++){
            for(let j = 0; j < columnSize - 1; j++){
            if(count < 2){
                count++;
                document.getElementById(i + "|" + j).setAttribute("class", "alive");
                gridArr[i][j] = 1;
            }
            else{
                count = 0;
                continue;
            }
        }
    }
}
  if(pattern.value == 'blinker') {
        
        let row = Math.round(rowSize/2);
        let col = Math.round(columnSize/2);
        
        document.getElementById(row + "|" + (col-1)).setAttribute("class", "alive");
        gridArr[row][col-1] = 1;
        
        
        document.getElementById(row + "|" + col).setAttribute("class", "alive");
        gridArr[row][col] = 1;

        document.getElementById(row + "|" + (col+1)).setAttribute("class", "alive");
        gridArr[row][col+1] = 1;
    }
    if(pattern.value == 'toad') {
        for(let c = columnSize-4; c <=columnSize-2; c++) {
            document.getElementById(2 + "|" + c).setAttribute("class", "alive");
            gridArr[2][c] = 1;
        }
        for(let c = columnSize-5; c <= columnSize-3; c++) {
            document.getElementById(3 + "|" + c).setAttribute("class", "alive");
            gridArr[3][c] = 1;
        }
    }
    if(pattern.value == "glider1") {
        let c = 2;
        let r = 3;

        document.getElementById((r+1) + "|" + (c)).setAttribute("class", "alive");
        gridArr[r+1][c] = 1;

        document.getElementById((r+1) + "|" + (c+1)).setAttribute("class", "alive");
        gridArr[r+1][c+1] = 1;

        document.getElementById((r-1) + "|" + (c+1)).setAttribute("class", "alive");
        gridArr[r-1][c+1] = 1;

        document.getElementById((r) + "|" + (c+1)).setAttribute("class", "alive");
        gridArr[r][c+1] = 1;

        document.getElementById((r) + "|" + (c-1)).setAttribute("class", "alive");
        gridArr[r][c-1] = 1;      
    }
}
   
    
        
    
    



function rules(i, j) {
    var neighborCount = getNeighbors(i, j);

    //Some applied rules based on the number of neighbors around

    if (gridArr[i][j] == 0) {  //Check dead cell
        if (neighborCount == 3) {
            gridArrCpy[i][j] = 1; //Create an alive cell if current placement has no alive cells
        }
    }
    else if (gridArr[i][j] == 1) { //Check with alive cell
        if (neighborCount < 2) {
            gridArrCpy[i][j] = 0;   //Die of underpopulation 
        } else if (neighborCount == 2 || neighborCount == 3) {
            gridArrCpy[i][j] = 1;  //Create an alive cell
        } else if (neighborCount > 3) {
            gridArrCpy[i][j] = 0; //Die from overpopulation
        }
    } 
}
    function swapGrids() {
        for (var i = 0; i < rowSize; i++) {
            for (var j = 0; j < columnSize; j++) {
                gridArr[i][j] = gridArrCpy[i][j];
                gridArrCpy[i][j] = 0;  //Reset other grid

                score = 0; //reset score count
            }
        }
    }
    //Function for changing the view of html table based on dead or alive cells

    function gridUpdate() {
        for (let i = 0; i < rowSize; i++) {
            for (let j = 0; j < columnSize; j++) {
                let cell = document.getElementById(i + "|" + j);
                if (gridArr[i][j] == 0) {
                    cell.setAttribute("class", "dead"); //The grid will display nothing if the grid array has a 0 value
                } else {
                    score += 1;
                    cell.setAttribute("class", "alive"); //The grid will display a cell if the grid array has a 1 value
                }
            }
        }
    }
    
   //Function for getting the total of neigbors of a cell  
   //Please Note: This getNeighbors function came from the ideas of "codesphere" from medium.com
function getNeighbors(row, column) {
      
    let totalCount = 0;

    //Checks for two rows. One row that is up and one row that is below
      
    for (let i = -1; i < 2; i++) { 

        //Making sure the column size is in bounds then increment

      if (column + i >= 0 && column + i < gridArr.length - 1) { 
        if (row > 0 && gridArr[row - 1][column + i] == 1) {  //Checking if neighbor is alive
          totalCount++;
        }

        //Making sure the row size is in bounds then increment
        if (row < gridArr.length - 1 && gridArr[row + 1][column + i] == 1) {  //Checking if neighbor is alive
          totalCount++;
        }
      }
    }
    // Check left side of cell and making sure the column size is in bounds

    if (column - 1 >= 0 && gridArr[row][column - 1] == 1) { 
      totalCount++;
    }

     // Check left side of cell and making sure the column size is in bounds

    if (column + 1 < gridArr.length - 1 && gridArr[row][column + 1] == 1) { 
      totalCount++;
    }

    return totalCount;
}

function countTime() {
    let timer = document.getElementById('timeContainer');
    const counter = setInterval(() => {
    time++;
    const min = Math.floor(time / 60);
    const sec = time % 60;
    timer.innerHTML = `${min}:${sec.toString().padStart(2, '0')}`;
    }, 1000);
}
function storeStats() {
    document.getElementById("stats").style.display = "inline"
    /*
        Many of the things in the methods are inspired from this link below
        https://www.youtube.com/watch?v=02L3jpT0m-s&ab_channel=ProductsExplorer
    */
    var file = "./storeData.php";
    let storeScore = score;
    let storeTime = time;
    fetch(file, {
        method:'POST',
        body: JSON.stringify({
            dataT: storeTime,
            dataS: storeScore
        }),
        headers : {'Content-type' : 'application/json;charset=utf-8'}
    }).then(res=> res.text()).then(function(resp){
    }).catch(err=>console.error(err));
    
}

