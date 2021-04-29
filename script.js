import Maze from "./Maze.js";


let m = new Maze(100,50);
// m.grid.printGrid();
// m.grid.grid[0][0] = 'v'
// m.grid.grid[1][0] = 'v'
// console.log('nieghbors: ' + m.getValidNeighbor(2,0,m.grid.grid).length);
// m.grid.printGrid();


m.generateRandomMaze();
console.log('ended');
