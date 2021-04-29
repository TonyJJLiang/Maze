export default class Maze {
    constructor(length,height){
        this.length = length;
        this.height = height;
        this.mazeState = [...Array(length)].map(outter => [...Array(height)].map(inner => 'X'))
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

    printMaze(){
        for (let y = 0; y < this.mazeState.length; y++) {
            let row = '';
            for (let x = 0; x < this.mazeState[y].length; x++) {
                row += this.mazeState[x][y];
            }
            console.log(row);
        }
    }

    generateRandomMaze(){
        this.fillMaze(0,0);
    }

    fillMaze(x,y){
        m.printMaze();
        console.log('---------->');
        this.mazeState[x][y] = '1';
        let potentialVisit = this.shuffle(this.getValidNeighbor(x,y));
        if (potentialVisit.length == 0){
            return;
        }
        //set this position to be viisted
        potentialVisit.forEach(neighbor => {
            let xCord = neighbor[0]
            let yCord = neighbor[1]
            if(this.mazeState[xCord][yCord]  == 'X'){
                this.fillMaze(xCord,yCord)
            }
        });
    }

    //generates list of neighbors that are within bound
    getValidNeighbor(x,y){
        let possibleDirection = [];
        //if top is within bounds
        if(this.withinBounds(x,y-1)){
            possibleDirection.push([x, y-1])
        }
        //if left is within bounds
        if(this.withinBounds(x-1,y)){
            possibleDirection.push([x-1, y])
        }
        //if bottom is within bounds
        if(this.withinBounds(x,y+1)){
            possibleDirection.push([x, y+1])
        }
        //if right is within bounds
        if(this.withinBounds(x+1,y)){
            possibleDirection.push([x+1, y])
        }
        if (possibleDirection.length == 0){
            return [];
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