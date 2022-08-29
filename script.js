const cards = document.querySelectorAll(".card");
let firstCard, secondCard, count = 1, pairs = 0, FlagStart = 0;
let statuscard = false, lock = false;
let start = document.querySelector(".start"), pause = document.querySelector(".pause"),
    restart = document.querySelector(".restart");
let sec = 0, min = 0, t = 0;

function flipCards() {
    if (FlagStart == 0) return;
    if (lock) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!statuscard) {
        firstCard = this;
        statuscard = true;
        return;
    }
    secondCard = this;
    statuscard = false;

    document.getElementById("count").innerHTML = "Move counter: " + count;
    //document.querySelector(".counter").innerHTML="move counter: "+ count;
    count++;
    checkEqual();
}

function checkEqual() {
    if (firstCard.dataset.img == secondCard.dataset.img) {
        equalcards();
        return;
    }
    unequalcards();
}

function equalcards() {
    firstCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);
    pairs++;
    if (pairs == 12) {
        clearTimeout(t);
        document.querySelector(".win").classList.add("active");
        document.querySelector(".winMsg").classList.add("active");
        document.querySelector(".finalcounter").innerHTML = 'Number of moves: ' + count + "<br/>Time:" +
            (min > 9 ? min : "0" + min) + ':' + (sec > 9 ? sec : "0" + sec);

        const closeButton = document.querySelector(".closeButton");
        closeButton.addEventListener('click', function () {
            document.querySelector(".win").classList.remove("active");
            document.querySelector(".winMsg").classList.remove("active");
        })
    }

    resetCards();
}

function unequalcards() {
    lock = true;
    setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetCards();
        }, 500
    )

}

function resetCards() {
    [statuscard, lock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function MixCard() {
    cards.forEach(card => {
            let number = Math.floor(Math.random() * 24);
            card.style.order = number;
        }
    )
})();

cards.forEach(card => card.addEventListener('click', flipCards));

let time = document.getElementById("Timer");

function tick() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
    }
}

function add() {
    tick();
    time.textContent = " Timer: " + (min > 9 ? min : "0" + min) +
        ':' + (sec > 9 ? sec : "0" + sec);
    timer();
}

function timer() {
    t = setTimeout(add, 1000)
}

//start.onclick=timer;
start.onclick = function () {
    timer();
    FlagStart = 1;
    document.querySelector(".counter").innerHTML = "";
}
pause.onclick = function () {
    clearTimeout(t);
    FlagStart = 0;
    document.querySelector(".counter").innerHTML = "Click 'start' to continue playing";
}
restart.onclick = function () {
    sec = 0;
    min = 0, count = 0;
    location.reload();
}
