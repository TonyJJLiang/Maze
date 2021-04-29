import GridMaker from "./GridMaker.js";

export default class Maze {
    constructor(length,height){
        this.length = length;
        this.height = height;
        this.grid = new GridMaker(length, height);
        this.grid.drawGrid();
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
        let stack = []
        let mazeState = this.grid.grid;
        let neighbors;
            do{
                mazeState[x1][y1] = 'v'
                neighbors = this.shuffle(this.getValidNeighbor(x1, y1, mazeState));
                if (neighbors.length == 0){
                    let previousPos = stack.pop();
                    x1 = previousPos[0]
                    y1 = previousPos[1]
                } else{
                    x2 = neighbors[0][0]
                    y2 = neighbors[0][1]
                    this.grid.openWall(x1,y1,x2,y2);
                    x1 = x2;
                    y1 = y2
                    stack.push([x1,y1])
                }
            } while(stack.length > 0);
    }
        //generates list of neighbors that are within bound
        getValidNeighbor(x, y, mazeState){
        let possibleDirection = [];
        // Check if neighbors are within bounds and visitable
        if(this.withinBounds(x,y-1) && mazeState[x][y-1] == '*'){
            possibleDirection.push([x, y-1])
        }
        if(this.withinBounds(x-1,y) && mazeState[x-1][y] == '*'){
            possibleDirection.push([x-1, y])
        }
        if(this.withinBounds(x,y+1) && mazeState[x][y+1] == '*'){
            possibleDirection.push([x, y+1])
        }
        if(this.withinBounds(x+1,y) && mazeState[x+1][y] == '*'){
            possibleDirection.push([x+1, y])
        }
        return possibleDirection;
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