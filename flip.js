/**
 * @param {string} s stands for 'selector'
 * @param {any} p stands for 'parent' container. defaults to 'document'
 */
// const $ = (s, p = document) => p.querySelector(s);

// const card = $(".card");

// card.addEventListener("click", () => {
//   card.classList.toggle("is-flipped");
// });

let clickCount = 0;
let firstCard;
let secondCard;
let pairsCounter = 0;
let numOfPairs = 4;
let enableClick = false;
let addition = 0;

function createInitial()
{
    initParams();
    let cards = document.querySelector('.wrapper');
    createCards(cards,numOfPairs);
    cards.style.display = 'flex';
    cards.style.flexDirection = 'rows';
    cards.style.flexWrap = 'wrap';
    cards.style.gap = '30px';
}

function initParams(){
    clickCount = 0;
    firstCard = undefined;
    secondCard = undefined;
    pairsCounter = 0;
    numOfPairs = 4;
    enableClick = false;
}

function createCards(cards,number)
{
    let basis = 4;
    if(number > 4)
        basis = 5;
    for(let i=0; i<number; ++i)
    {
        for(let j=0; j<2; ++j)
        {
            let newCardEl = document.createElement('div');
            newCardEl.className = 'card';
            newCardEl.setAttribute('data', "str : one");
            newCardEl.style.flexBasis = `calc(${100/basis}% - 60px)`;
            let elf = document.createElement('div');
            elf.className = 'cardFace cardFaceFront';
            newCardEl.appendChild(elf);
            let elb = document.createElement('div');
            elb.className = 'cardFace cardFaceBack';
            newCardEl.appendChild(elb);

            newCardEl.addEventListener("click", checkPair);
            
            cards.appendChild(newCardEl);
        }
    }
}


function arrangeNewGame()
{
    enableClick = false;

    if(numOfPairs + addition >= 25)
    {
        window.alert('WIN WIN WIN !!!');
        return;
    }
    let cardsContainer = document.querySelector('.wrapper');
    if(addition !== 0)
    {
        initParams();
        let cards = document.querySelectorAll('.card');
        for(let i of cards)
        {
            cardsContainer.removeChild(i);
        }
        numOfPairs += addition;
        createCards(cardsContainer,numOfPairs);
    }
        // let cards = document.querySelectorAll('.card');
        // for(let card in cards)
        // {
        //     card.flexBasis = `calc(${100/number}% - 60px)`;
        // }

    
    let cardsFront = document.querySelectorAll('.cardFaceFront');
    // let cardsParent = document.querySelectorAll('.card');
    let icons = getUniqueSet(numOfPairs);
    for(let [i,cardFront] of cardsFront.entries())
    {
        cardFront.textContent = icons[i];
        cardFront.parentElement.dataset.str = icons[i];
    }
    setTimeout(flipAll,3000);
}

function flipAll()
{
    let cards = document.querySelectorAll('.card');
    for(card of cards)
    {
        card.classList.toggle("is-flipped");
    }
    enableClick = true;
}

function checkPair(event)
{
    if(!enableClick)
        return;
    let newCardEl = event.target;
    newCardEl.parentNode.classList.toggle("is-flipped");
    ++clickCount;
    if(2 === clickCount)
    {
        secondCard = event.target;
        clickCount = 0;
        if(firstCard.parentNode.dataset.str !== secondCard.parentNode.dataset.str)
        {
            setTimeout(()=>{
                firstCard.parentNode.classList.toggle("is-flipped");
                secondCard.parentNode.classList.toggle("is-flipped");
            },1000);
        }
        else{
            ++pairsCounter;
            if(pairsCounter === numOfPairs)
            {
                addition++;
                setTimeout(arrangeNewGame,3000);
            }
        }
    }
    else
    {
        firstCard = event.target;
    } 
}


function main(){
    
    createInitial();
    arrangeNewGame();
    //startGame();
}

function getUniqueSet(number)
{
    let retIcons = [];
    const icons = [
        "🤩","🥦","🐋","🍬","🐰","🚀","🍒","🍕","🍫","🐶","🎉","🎈","🍇","🍔","🌶","🍤","🍱","🥧","🍦","🍭","🍼",
        "🍺","🎱","⚽","🏆"];
    if(number > icons.length || number < 1)
        return retIcons;
    let oneIconOfEach = [...icons];
    let tempNumber;
    for(let i=0;i<number; ++i)
    {
        tempNumber = number - i;
        let j = Math.floor(Math.random()*tempNumber)%tempNumber;
        retIcons.push(oneIconOfEach[j]);
        oneIconOfEach.splice(j,1);
    }
    let pairIcons = [...retIcons,...retIcons];
    retIcons = [];
    for(let i=0;i<number*2; ++i)
    {
        tempNumber = number*2 - i;
        let j = Math.floor(Math.random()*tempNumber)%tempNumber;
        retIcons.push(pairIcons[j]);
        pairIcons.splice(j,1);
    }
    return retIcons;
}

main();