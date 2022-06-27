const cards= document.querySelectorAll(".card");
let firstCard, secondCard, count=1, pairs=0;
let statuscard=false;
let lock=false;

function flipCards(){
    if (lock) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!statuscard){
        firstCard=this;
        statuscard=true;
        return;
    }
    secondCard=this;
    statuscard=false;
    document.querySelector(".counter").innerHTML="move counter: "+ count;
    count++;
    checkEqual(); 
}
function checkEqual(){
    if (firstCard.dataset.img == secondCard.dataset.img){
        equalcards();
        return;
    }
    unequalcards();
}
function equalcards(){
    firstCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);
    pairs++;
    if (pairs==12){
        document.querySelector(".win").classList.add("active");
        document.querySelector(".winMsg").classList.add("active");
        document.querySelector(".finalcounter").innerHTML='Number of moves: '+count;

        const closeButton=document.querySelector(".closeButton");
        closeButton.addEventListener('click', function(){
            document.querySelector(".win").classList.remove("active");
            document.querySelector(".winMsg").classList.remove("active");
        })
    }
        
    resetCards();
}
function unequalcards(){
    lock = true;
    setTimeout(() =>{
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetCards();
    }, 500
    )
    
}
function resetCards(){
    [statuscard, lock]=[false,false];
    [firstCard, secondCard]=[null, null];
}
(function MixCard() {
    cards.forEach(card =>{
        let number = Math.floor(Math.random() * 24);
        card.style.order=number;
    }
    )
})();

cards.forEach(card => card.addEventListener('click', flipCards));
