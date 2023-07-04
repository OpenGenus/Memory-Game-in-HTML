const tileContainer= document.querySelector(".tileContainer");



     const popup = document.createElement('div');
      popup.className = 'popup';


      const popupContent = document.createElement('div');
      popupContent.className = 'popup-content';
      popupContent.innerHTML=
      
      `
    <p> Rules: <p> 
    <br> 
    <ol>
        <li> Match the cards before 30 moves or 5 minutes.</li>
        <li> After the close button is hit the time starts to tick. </li>
        <li> The page will auto reload when game is over. </li>
        <li> You can't choose other tiles nor can you match self.</li>
        <li> After wrong matching, wait for a second to match again. </li>
    </ol>

      `;


      const closeButton = document.createElement('span');
      closeButton.className = 'popup-close';
      closeButton.innerHTML = '&times;'
      popupContent.appendChild(closeButton);
      

      closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
        start()
      });

  
      

      popup.appendChild(popupContent);

   
      document.body.appendChild(popup);
 


const Name=document.createElement('h1');
Name.classList.add('name');
Name.style.fontSize='20px';
Name.style.marginTop='4em'


tileContainer.insertAdjacentElement('beforebegin', Name);


const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];
const pickList=[...colors,...colors];

const tileCount=pickList.length;

// Game state

let matchedCount=0;
let activeTile=null;
let flipped= false;
let m=00,s=00,c=0;

// build up tiles
console.log(pickList)

function timegen(){
    

    s+=1
    if(s==60){
        m+=1
        s=0
    }

    

    Name.innerHTML=`Time: ${m} min:${s} sec`+'  ' +`  Moves:${c}`+`  `+`Matched:${Math.floor(matchedCount/2)} pair`
}



function buildTile(color,interval)
{

    const tileElement=document.createElement("div");

    tileElement.classList.add("tile");
    
    tileElement.setAttribute('data-color',color);


    // tileElement.addEventListener('dblclick',()=>{})

    tileElement.addEventListener('click', ()=>{
        
        if(flipped)
        {
            return;
        }


        tileElement.style.backgroundColor= color;

        if(activeTile==tileElement)
        {
            return;
        }
        if(!activeTile)
        {
            activeTile=tileElement;

            return;
        }


        colorToMatch=activeTile.getAttribute('data-color');
        console.log(colorToMatch,color);
        

        if( c == 30|| m == 5 )
        {
            const tiles=document.querySelectorAll('.tile');  
            
            tiles.forEach((tile)=>{
                tile.remove();
            })

            clearInterval(interval);
            c=0;

            const gameover=document.querySelector('.name');
            gameover.innerHTML= `<h3>You Lost<h3> <br> <p> Try again</p> `;
            gameover.classList.remove('name');
            gameover.classList.add('lost');
            setTimeout(() => {
                location.reload()
            }, 10000);


        }
        else{


            if(colorToMatch==color)
        {
            
        
            activeTile.classList.remove('tile');
            activeTile.setAttribute('id','transparent');
            tileElement.classList.remove('tile');
            tileElement.setAttribute('id','transparent');

            matchedCount+=2;

            if(matchedCount==tileCount)
            {
                // alert('All Matched, refresh to start again.');

                const tiles=document.querySelectorAll('#transparent');  
                
                tiles.forEach((tile)=>{
                    tile.remove();
                })

                // const gameover=document.createElement('div');
                const gameover=document.querySelector('.name');
                gameover.innerHTML='GAME OVER!!';
                gameover.classList.remove('name');
                gameover.classList.add('gameover');
                setTimeout(() => {
                    location.reload()
                }, 10000);

            }

        }
        
      

        }

        flipped=true;
        setTimeout(()=>{
            tileElement.style.backgroundColor=null;
            activeTile.style.backgroundColor=null;
            
            activeTile=null;
            flipped =false;


        },1000)
        
        c+=2

    })

    return tileElement;

}



function start(){


   let interval=setInterval(timegen, 1000);


    for(let i=0; i<tileCount;i++)
{

    const randomIndex=Math.floor(Math.random() * pickList.length );
    const item=pickList[randomIndex];
    const tile=buildTile(item,interval);


    pickList.splice(randomIndex,1);
    console.log(item, tile);

    tileContainer.appendChild(tile);

}



}









