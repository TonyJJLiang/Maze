export default class GridMaker{
    constructor(length, height){
        this.length = length;
        this.height = height;
        this.container = document.getElementById('container');
        this.grid = [...Array(length)].map(x => [...Array(height)].map(x=>'*'))
    }

     printGrid(){
        for (let y = 0; y < this.height; y++) {
            let line = '';
            for (let x = 0; x < this.length; x++) {
                line += this.grid[x][y];
            }
            console.log(line);
        }
    }

    drawGrid(){
        let cell;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.length; x++) {
                cell = document.createElement('div')
                cell.classList.add('cell');
                this.container.append(cell);
            }
        }
        let input = '';
        for (let i = 0; i < this.length; i++) {
            input += 'auto '
        }
        this.container.style.gridTemplateColumns = input;
    }
    cordToNodeIndex(x,y){
        return x + y*this.length;
    }

    openWall(x1,y1,x2,y2){
        let cells = document.querySelectorAll('.cell');
        //open top cell
        if(y2-y1 == -1){
            cells[this.cordToNodeIndex(x1,y1)].style.borderTop = 'None';
            cells[this.cordToNodeIndex(x2,y2)].style.borderBottom = 'None';
        }
        //open bottom cell
        if(y2-y1 == 1){
            cells[this.cordToNodeIndex(x1,y1)].style.borderBottom = 'None';
            cells[this.cordToNodeIndex(x2,y2)].style.borderTop = 'None';
        }
        //open left cell
        if(x2-x1 == -1){
            cells[this.cordToNodeIndex(x1,y1)].style.borderLeft = 'None';
            cells[this.cordToNodeIndex(x2,y2)].style.borderRight = 'None';
        }
        //open left cell
        if(x2-x1 == 1){
            cells[this.cordToNodeIndex(x1,y1)].style.borderRight = 'None';
            cells[this.cordToNodeIndex(x2,y2)].style.borderLeft = 'None';
        }
    }
}