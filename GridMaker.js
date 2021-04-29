export default class GridMaker{
    constructor(length, height){
        this.length = length;
        this.height = height;
        this.container = document.getElementById('container');
        this.grid = [...Array(length)].map(x => [...Array(height)].map(x=>'*'))
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
        //open top bottom, left, or right wall of cell grid
        if(y2-y1 == -1){
            cells[this.cordToNodeIndex(x1,y1)].style.borderTop = 'None';
            cells[this.cordToNodeIndex(x2,y2)].style.borderBottom = 'None';
        } else if(y2-y1 == 1){
            cells[this.cordToNodeIndex(x1,y1)].style.borderBottom = 'None';
            cells[this.cordToNodeIndex(x2,y2)].style.borderTop = 'None';
        } else if(x2-x1 == -1){
            cells[this.cordToNodeIndex(x1,y1)].style.borderLeft = 'None';
            cells[this.cordToNodeIndex(x2,y2)].style.borderRight = 'None';
        } else if(x2-x1 == 1){
            cells[this.cordToNodeIndex(x1,y1)].style.borderRight = 'None';
            cells[this.cordToNodeIndex(x2,y2)].style.borderLeft = 'None';
        }
    }
}