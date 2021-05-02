import GridMaker from "./GridMaker.js";

export default class Maze {
    constructor(length,height){
        this.length = length;
        this.height = height;
        this.grid = new GridMaker(length, height);
        this.grid.drawGrid();
        this.cells = document.querySelectorAll('.cell');
    }
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    generateRandomMaze(){
        //stack representing the list of directions taken to get to current postion
        let x1 = 0, y1 = 0;
        let x2,y2;
        let stack = [];
        let mazeState = this.grid.grid;
        let neighbors;
            do{
                mazeState[x1][y1] = 'v';
                neighbors = this.shuffle(this.getValidNeighbor(x1, y1, mazeState));
                if (neighbors.length == 0){
                    let previousPos = stack.pop();
                    x1 = previousPos[0];
                    y1 = previousPos[1];
                } else{
                    x2 = neighbors[0][0];
                    y2 = neighbors[0][1];
                    this.grid.openWall(x1,y1,x2,y2);
                    x1 = x2;
                    y1 = y2;
                    stack.push([x1,y1]);
                }
            } while(stack.length > 0);
    }
        //generates list of neighbors that are within bound
        getValidNeighbor(x, y, mazeState){
        let possibleDirection = [];
        // Check if neighbors are within bounds and visitable
        if(this.withinBounds(x,y-1) && mazeState[x][y-1] == '*'){
            possibleDirection.push([x, y-1]);
        }
        if(this.withinBounds(x-1,y) && mazeState[x-1][y] == '*'){
            possibleDirection.push([x-1, y]);
        }
        if(this.withinBounds(x,y+1) && mazeState[x][y+1] == '*'){
            possibleDirection.push([x, y+1]);
        }
        if(this.withinBounds(x+1,y) && mazeState[x+1][y] == '*'){
            possibleDirection.push([x+1, y]);
        }
        return possibleDirection;
    }

    delay(time){
        return new Promise((res) => setTimeout(res,time))
    }

    async depthFirstSearch(){

        let endPos = [this.length-1,this.height-1];
        let startPos = [0,0];
        let currPos;
        let currentCell = this.cells[this.grid.cordToNodeIndex(startPos[0],startPos[1])]
        let visited = [...Array(this.length)].map( x => [...Array(this.height)].map(x => false))

        let stack = [];
        stack.push(startPos);

        while(stack.length > 0){
            currPos = stack.pop();
            visited[currPos[0]][currPos[1]] = true;
            currentCell = this.cells[this.grid.cordToNodeIndex(currPos[0],currPos[1])]
            this.changeCellColor(currentCell,'rgb(255,255,255)')

            if(currPos[0] == endPos[0] && currPos[1] == endPos[1]){
                return
            }

            if(window.getComputedStyle(currentCell).getPropertyValue('border-top').includes('0px') && !visited[currPos[0]][currPos[1] - 1]) {
                stack.push([currPos[0], currPos[1] - 1]);
            }
            if(window.getComputedStyle(currentCell).getPropertyValue('border-left').includes('0px') && !visited[currPos[0] - 1][currPos[1]]){
                stack.push([currPos[0] - 1, currPos[1]]);
            }
            if(window.getComputedStyle(currentCell).getPropertyValue('border-bottom').includes('0px') && !visited[currPos[0]][currPos[1] + 1]){
                stack.push([currPos[0], currPos[1] + 1]);
            }
            if(window.getComputedStyle(currentCell).getPropertyValue('border-right').includes('0px') && !visited[currPos[0] + 1][currPos[1]]){
                stack.push([currPos[0] + 1, currPos[1]]);
            }
            await this.delay(10)
            this.changeCellColor(currentCell,'rgb(65, 219, 230)')
        }
    }

    changeCellColor(cell, color){
        cell.style.backgroundColor = color;
    }
    
    withinBounds(x,y){
        if (x < 0 | x >= this.length){
            return false;
        }
        if (y < 0 | y >= this.height){
            return false;
        }
        return true;
    }
}