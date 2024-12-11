const box = document.querySelector(".grid-container");
const winnerDiv = document.querySelector("#winner");
const clearBtn = document.querySelector("#clearBtn");

const gameboard = (function(){
    const board = [0,1,2,3,4,5,6,7,8];

  //podia ter usado o .fill(), mas depois mais a baixo na lógica do jogo, os números também ajudam

    const initArray = ()=>{ 
    for(let i = 0; i<board.length;i++){
        board[i] =i;
    
    }
}
    
    const displayBoard = ()=>{
        //board.forEach(element => console.log(element));
        console.log(`${board[0]} ${board[1]} ${board[2]}`);
        console.log(`${board[3]} ${board[4]} ${board[5]}`);
        console.log(`${board[6]} ${board[7]} ${board[8]}`);
    }
        
    const checkIfSpotIsEmpty = (spot)=>{
          const spoti = board[spot];
            if(spoti == "i" || spoti=="X" || spoti=="O"){
          //if(spotValues.includes(spot) == true){
              return false;
            }
          else{
              return true;
            }
  }
        
    return {board,displayBoard, checkIfSpotIsEmpty,initArray};
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
    let pl = players.plrs;
    let winner = pl.find((plr)=>plr.player === value);
    return winner.player;
  }
  
  const winners=[];
  
  function displayWinner(winners,winnerDiv){
    let length = winners.length;
    winnerDiv.innerText += winners[length-1];
    }
  
var playCount = 0;

  function checkWinner(gboard,players,winnerDiv){
      if(playCount==9){
        winnerDiv.innerText += "It's a tie";
      };
      if(gboard.board[0] == gboard.board[1] && gboard.board[1] == gboard.board[2]){
          let winner = checkWinnerValue(gboard.board[0],players);
          winners.push(winner);
          displayWinner(winners,winnerDiv);
          //return true;
      }
      if(gboard.board[3] == gboard.board[4] && gboard.board[4] == gboard.board[5]){
          let winner = checkWinnerValue(gboard.board[3],players);
          winners.push(winner);
          displayWinner(winners,winnerDiv);
          //return true;
      }
      if(gboard.board[6] == gboard.board[7] && gboard.board[7] == gboard.board[8]){
          let winner = checkWinnerValue(gboard.board[6],players);
          winners.push(winner);
          displayWinner(winners,winnerDiv);
          //return true;
      }
      if(gboard.board[0] == gboard.board[3] && gboard.board[3] == gboard.board[6]){
          let winner = checkWinnerValue(gboard.board[0],players);
          winners.push(winner);
          displayWinner(winners,winnerDiv);
          //return true;
      }
      if(gboard.board[1] == gboard.board[4] && gboard.board[4] == gboard.board[7]){
          let winner = checkWinnerValue(gboard.board[1],players);
          winners.push(winner);
          displayWinner(winners,winnerDiv);
          //return true;
      }
      if(gboard.board[2] == gboard.board[5] && gboard.board[5] == gboard.board[8]){
          let winner = checkWinnerValue(gboard.board[2],players);
          winners.push(winner);
          displayWinner(winners,winnerDiv);
          //return true;
      }
      if(gboard.board[0] == gboard.board[4] && gboard.board[4] == gboard.board[8]){
          let winner = checkWinnerValue(gboard.board[0],players);
          winners.push(winner);
          displayWinner(winners,winnerDiv);
          //return true;
      }
      if(gboard.board[2] == gboard.board[4] && gboard.board[4] == gboard.board[6]){
          let winner = checkWinnerValue(gboard.board[2],players);
          winners.push(winner);
          displayWinner(winners,winnerDiv);
          //return true;
      }
      else{
        // playCount+=1;
        return false;
      }
      
  }
  
  function changeTurn(activePlayer,players){
    
    if(activePlayer == players[0]){
        return activePlayer=players[1];
    }
    else{
        return activePlayer=players[0];
    }
  }
  

function playRoundDom(e,gboard,activePlayer,players){

    gboard.board[e] = activePlayer;
    e.innerText = activePlayer;
    activePlayer = changeTurn(activePlayer,players);

}
  
const players = (function(){
    let plrs= [
        {
            "player": "X"
        },
        {
            "player": "O"
        }];

     let activePlayer = plrs[0];

     const changeActivePlayer = function(){
    
        if(activePlayer == plrs[0]){
            return activePlayer=plrs[1];
        }
        else{
            return activePlayer=plrs[0];
        }
      }

      return{plrs,activePlayer,changeActivePlayer};
        
})();

  function game(gboard,box,players){
    
    attributeBoardValues(gboard, box,players,winnerDiv);
  };
  
  game(gameboard,box,players);
  
  
//DOM

function clearBoard(box,winnerDiv){
    box.replaceChildren();
    winnerDiv.innerText = "Winner: ";
    
};

clearBtn.addEventListener("click", ()=>{
    clearBoard(box,winnerDiv);
    gameboard.initArray();
    attributeBoardValues(gameboard,box,players,winnerDiv);
    playCount=0;
})

function attributeBoardValues(gboard,box,players,winnerDiv){

    const board=gboard.board;

    board.forEach((element,index)=>{
        const newDiv = document.createElement("button");
        newDiv.className = "grid-item";

        newDiv.innerText = element;
        newDiv.dataset.cell = index;

        newDiv.addEventListener("click",(e)=>{
            playCount+=1;
            changeDomCellValue(e.target,players,gboard,winnerDiv);     
        },{once:true});

        box.appendChild(newDiv);
    })
}

function changeDomCellValue(e,players,gboard,winnerDiv){
        
    gboard.board[e.dataset.cell] = players.activePlayer.player;
    e.innerText = players.activePlayer.player;
    players.activePlayer = players.changeActivePlayer();
    checkWinner(gboard,players,winnerDiv);
    
}

//attributeBoardValues(gameboard, box);

//fiquei aqui

/*function cleanDomBoard(box){
    while(box.firstChild){
        box.firstChild.remove();
    }
}
*/
function clickSpot(box,gboard,activePlayer){
        box.addEventListener("click",(e)=>{
        gboard.board[e.target.innerText] = activePlayer;
        e.target.innerText = activePlayer;
        
    })

}

//let activePlayer = "X";

//clickSpot(box,activePlayer,gameboard);