const gameboard = (function(){
    const board = ["i","i","i","i","i","i","i","i","i"];
    
    for(let i = 0; i<board.length;i++){
        board[i] =i;
    }
    
    
    const displayBoard = ()=>{
        board.forEach(element => console.log(element));
        }
        
    const checkIfSpotIsEmpty = (spot)=>{
          const spoti = board[spot];
            if(spoti == "i" || spoti=="X" || spoti=="O"){
              return false;
            }
          else{
              return true;
            }
  }
        
    return {board,displayBoard, checkIfSpotIsEmpty};
  })();
  
  
  function chooseSpot(board, spot, activePlayer){
    const checkSpot = board.checkIfSpotIsEmpty(spot);
    
    if(checkSpot == true){
        board.board[spot] = activePlayer.player;
    }
    else{
        console.log("Spot occupied");
        const newSpot = prompt("Choose new spot: ");
        chooseSpot(board,newSpot,activePlayer);
    }
  }
  
  function checkWinnerValue(value, players){
      let winner = players.filter((player)=>player.player == value);
      return winner;
  }
  
  const winners=[];
  
  function displayWinner(winners){
      let length = winners.length;
      console.log("Winner: ");
      console.log(winners[length-1]);
  }
  
  function checkWinner(gboard,players){
      
      if(gboard.board[0] == gboard.board[1] && gboard.board[1] == gboard.board[2]){
          let winner = checkWinnerValue(gboard.board[0],players);
          winners.push(winner);
          return true;
      }
      else{
          return false;
      }
  }
  
  function changeTurn(activePlayer,players){
    
    if(activePlayer == players[0]){
        return activeplayer=players[1];
    }
    else{
        return activePlayer=players[0];
    }
  }
  
  function playRound(board, players,activePlayer){
      
      let movesCount=0;
      
      while(movesCount<10 && checkWinner(board,players) == false){
            console.log("Player's turn: "+activePlayer.player);
            let spot = prompt("Choose Board Spot: ");
            chooseSpot(board,spot,activePlayer);
            board.displayBoard();
            activePlayer = changeTurn(activePlayer,players);
            movesCount++;
            }
        if(movesCount == 10){
            console.log("It's a tie.")
        }
        else{
            displayWinner(winners);
        }
      }
  
  function game(board){
    let players= [
        {
            "player": "X"
        },
        {
            "player": "O"
        }];
    
    let activePlayer = players[0];
    
    board.displayBoard();
   
   playRound(board,players,activePlayer);
 
  };
  
  game(gameboard);
  