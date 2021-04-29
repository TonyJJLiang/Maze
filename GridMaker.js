export default class GridMaker{
    constructor(length, height, container){
        this.length = length;
        this.height = height;
        this.container = container;
        this.grid = [...Array(length)].map(x => [...Array(height)].map(x=>'x'))
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
        console.log(input);
        this.container.style.gridTemplateColumns = input;
    }
}