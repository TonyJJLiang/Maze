import Maze from "./Maze.js";

let m = new Maze(100,50);
//let m = new Maze(3,3);
m.generateRandomMaze();

m.depthFirstSearch();