export default class GridMaker{
    constructor(length, height){
        this.grid = [...Array(length)].map(x => [...Array(height)].map(x=>'x'))

    }

    printGrid(){
        for (let y = 0; y < this.length; y++) {
            for (let x = 0; x < this.height; x++) {
                console.log(grid[x][y]);
            }
        }
    }
}