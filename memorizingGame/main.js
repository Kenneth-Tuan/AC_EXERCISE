const Symbols = [
    'https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png', // 黑桃
    'https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png', // 愛心
    'https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png', // 方塊
    'https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png' // 梅花
  ]

const GAME_STATE = {
  FirstCardAwaits: "FirstCardAwaits",
  SecondCardAwaits: "SecondCardAwaits",
  CardsMatchFailed: "CardsMatchFailed",
  CardsMatched: "CardsMatched",
  GameFinished: "GameFinished",
}

const player = {
  name: "",
  triedTimes: 0
}

const view = {
    //displayCards - 負責選出 #cards 並抽換內容
    displayCards (indexes) {
      const rootElement = document.querySelector('#cards')
      rootElement.innerHTML = indexes.map(index => this.getCardElement(index)).join('')
    },
    //transformNumber - transform the numbers 11, 12, 13 & 1 to J, Q, K & A
    transformNumber (number) {
        switch (number) {
          case 1:
            return 'A'
          case 11:
            return 'J'
          case 12:
            return 'Q'
          case 13:
            return 'K'
          default:
            return number
        }
      },

    getCardContent (index) {
      const number = this.transformNumber((index % 13) +1)
      const symbol = Symbols[Math.floor(index / 13)]
      return `
          <p>${number}</p>
          <img src="${symbol}" alt="">
          <p>${number}</p>
      `
    },
    //getCardElement - 負責生成卡片內容，包括花色和數字
    getCardElement (index) {
        return `<div class="card back" data-index="${index}"></div>`
    },

    flipCards(...cards) {
      cards.map(card => {
        if (card.classList.contains('back')) {
          card.classList.remove('back')
          card.innerHTML = this.getCardContent(Number(card.dataset.index))
           // 如果是背面 回傳正面    
           return 
        }
        // 如果是正面 回傳背面
        card.classList.add('back')
        card.innerHTML = null
      })

    },

    pairCards(...cards) {
      cards.map(card => {
        card.classList.add('paired')
      })
    },

    renderScore(score) {
      document.querySelector('.score').innerHTML = `Score: ${score}`
    },
    renderTriedTimes(times) {
      document.querySelector('.tried').innerHTML = `You've tried: ${times} times`
    },

    appendWrongAnimation(...cards) {
      cards.map(card => {
        card.classList.add('wrong')
        card.addEventListener('animationend', event =>   
          event.target.classList.remove('wrong'), { once: true })
          //「動畫結束事件 (animationend)」，一旦動畫跑完一輪，就把 .wrong 這個 class 拿掉。
          //最後的 {once: true} 是要求在事件執行一次之後，就要卸載這個監聽器。因為同一張卡片可能會被點錯好幾次，每一次都需要動態地掛上一個新的監聽器，並且用完就要卸載。
      })

    },

    showGameFinished() {
      const div = document.createElement('div')
      div.classList.add('completed')
      div.innerHTML = `
        <p>Completed!</p>
        <p>Score: ${model.score}</p>
        <p>You've tried: ${model.triedTimes} times</p>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-outline-info me-3" data-bs-toggle="modal" data-bs-target="#modal">Save</button>
          <button type="button" class="btn btn-outline-primary newGame">New Game</button>
        </div>
      `
      const header = document.querySelector('#header')
      header.before(div)
    }

}

const utility = {
  getRandomNumberArray (count) {
    const number = Array.from(Array(count).keys())
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1))
        ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
    }
    return number
  },

  addToPlayersList (name) {
    const list = JSON.parse(localStorage.getItem('players')) || []  
    player.name = name
    // if (list.some((player) => player.name === name)) {}   如果排行榜内已有相同名稱的情況該如何處理
    player.triedTimes = model.triedTimes
    list.push(player)
    console.log(list)
    localStorage.setItem('players', JSON.stringify(list))
  }
}

const model = {
  revealedCards: [],//將翻開的卡牌存入該陣列中

  isRevealedCardsMatched () {
    return this.revealedCards[0].dataset.index % 13 ===
    this.revealedCards[1].dataset.index % 13
  },

  score: 0,
  triedTimes: 1
}

const controller = {
  currentState: GAME_STATE.FirstCardAwaits, // 第一個狀態
  generateCards () {//生成卡牌函數，呼叫view裏的displayCards，參數為utility中的洗牌函數傳出的隨機陣列
    view.displayCards(utility.getRandomNumberArray(52))
  },

  dispatchCardAction (card) {//派遣卡牌函式
    if (!card.classList.contains('back')) {//假如點擊的卡牌不是背面則跳出函式
      return
    }
    switch (this.currentState) { //推進翻拍進度 根據currentState
      case GAME_STATE.FirstCardAwaits: //假如狀態為FirstCardAwaits時
        view.flipCards(card) //生成卡牌的正面
        model.revealedCards.push(card) //將該卡牌的内容傳入revealedCards Array
        this.currentState = GAME_STATE.SecondCardAwaits //狀態推進至SecondCardAwaits
        break
      case GAME_STATE.SecondCardAwaits:
        view.renderTriedTimes(model.triedTimes++)
        view.flipCards(card)
        model.revealedCards.push(card)
        if(model.isRevealedCardsMatched()){ //Paired successfully
          this.currentState = GAME_STATE.CardsMatched 
          view.pairCards(...model.revealedCards)
          model.revealedCards = []
          view.renderScore(model.score += 10)
          if (model.score === 260) {
            console.log('GameFinished')
            this.currentState = GAME_STATE.GameFinished
            view.showGameFinished()
            document.querySelectorAll('.btn').forEach(btn => {
              btn.addEventListener('click', event => {
                target = event.target
                if(target.matches('.newGame')) {
                  controller.newGame()
                }
              })
            })
            return
          }
          this.currentState = GAME_STATE.FirstCardAwaits
        } else { //Pairing failed
           this.currentState = GAME_STATE.CardsMatchFailed
           view.appendWrongAnimation(...model.revealedCards)
           setTimeout(this.resetCards, 1000)
        }
        break
    }
  },

  resetCards () {
    view.flipCards(...model.revealedCards)
    model.revealedCards = []
    controller.currentState = GAME_STATE.FirstCardAwaits
  }, 

  newGame () {
    location.reload()
    console.log('11111')
  }
}

controller.generateCards()

//Node List (array-like) 選取所有的卡片並挂上事件監聽器
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', event => {
    controller.dispatchCardAction(card)
  })
})

document.querySelector('#name-form').addEventListener('submit', event => {
  event.preventDefault()
  utility.addToPlayersList(document.querySelector('#name-input').value.trim())
})
