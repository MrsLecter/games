
import Maze from './maze.js' ;

window.addEventListener('load', function(){
    console.log('load');
    //start  coordinates
    let errors = 0;
    let x = 1;
    let y = 1;

    //times
    let timeStart = 0;
    let timeEnd = 0;

    //new coordinatees
    let newX = x;
    let newY = y;

    //create maze and add player
    let mazeGame = new Maze(gamefield);
    mazeGame.init({width: 25, height: 25, cellSize: 15});
    mazeGame.addEventListener('ready', function(event){
        timeStart = Date.now();
        mazeGame.setCell(x, y, Maze.CELLS.player);
        mazeGame.gamefield.setCellClass(23, 23, Maze.CELLS.exit);
        
    });

    //press key handler
    document.addEventListener('keydown', function(event){
        //clear the passed area
        mazeGame.gamefield.setCellClass(x, y, Maze.CELLS.empty);

        //count new coordinates
        if(event.key === 'ArrowRight'){
            newX += 1;
        }
        if(event.key === 'ArrowLeft'){
            newX -= 1;
        }
        if(event.key === 'ArrowUp'){
             newY -= 1;
        }
        if(event.key === 'ArrowDown'){
            newY +=1;
        }

        //collision check
        if(mazeGame.getCell(newX, newY) === 'permanent'){
            newX = x;
            newY = y;
            errors++;
        }
        //accept coordinates
            x = newX;
            y = newY;
        //if reached the end point
        if(mazeGame.getCell(newX, newY) === 'exit'){
            timeEnd = Date.now();
            alert(`*** End game *** \n - Errors: ${errors} \n - Your time: ${Math.round((timeEnd - timeStart)/1000)}s`);
        }
        //new player position
        mazeGame.setCell(newX, newY, Maze.CELLS.player);

       
        
    });

})
