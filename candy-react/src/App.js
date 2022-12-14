import { useEffect, useState } from "react"

const width = 8
const candyColors = [
  `blue`,
  `green`,
  `yellow`,
  `red`,
  `orange`,
  `purple`
]

function App() {
  const [currentColorArray, setCurrentColorArray] = useState ([])

  const checkColumnOfFour = () => {
    for(let i = 0; i<39; i++) {
      const columnOfFour = [i, i + width, i + width *2, + width*3]
      const decidedColor = currentColorArray[i]

      if (columnOfFour.every(square => currentColorArray[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArray[square] ='')
      }
    }
  }

  const checkRowOfFour = () => {
    for(let i = 0; i<64; i++) {
      const rowOfFour = [i, i + 1, i + 2]
      const decidedColor = currentColorArray[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47 ,53, 54, 55, 62, 63, 64]

      if(notValid.includes(i)) continue

      if (rowOfFour.every(square => currentColorArray[square] === decidedColor)) {
        rowOfFour.forEach(square => currentColorArray[square] ='')
      }
    }
  }


  const checkColumnOfThree = () => {
    for(let i = 0; i<47; i++) {
      const columnOfThree = [i, i + width, i + width *2]
      const decidedColor = currentColorArray[i]

      if (columnOfThree.every(square => currentColorArray[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArray[square] ='')
      }
    }
  }

  const checkRowOfThree = () => {
    for(let i = 0; i<64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArray[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47 ,54, 55, 63, 64]

      if(notValid.includes(i)) continue

      if (rowOfThree.every(square => currentColorArray[square] === decidedColor)) {
        rowOfThree.forEach(square => currentColorArray[square] ='')
      }
    }
  }

const moveSquareBelow = () => {
  for (let i = 0; i<64 - width; i++ ){
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
    const isFirstRow = firstRow.includes(i)

    if (isFirstRow && currentColorArray[i] === '') {
      let randomNumber = Math.floor(Math.random() * candyColors.length)
      currentColorArray[i] = candyColors[randomNumber]
    }
    if((currentColorArray[i + width]) === '') {
      currentColorArray[i + width] = currentColorArray[i]
      currentColorArray[i] = ''
    }
  }
}

const createBoard = () => {
  const randomColorArray = []
  for (let i =0; i<width * width; i++){
    const randomColor = candyColors[Math.floor(Math.random() *  candyColors.length)]
    randomColorArray.push(randomColor)
  }
  setCurrentColorArray(randomColorArray)
  
}
useEffect(() => {
  createBoard()
}, [])

useEffect (() => {
  const timer = setInterval (() => {
    checkColumnOfThree()
    checkColumnOfFour()
    checkRowOfFour ()
    checkRowOfThree()
    moveSquareBelow ()
    setCurrentColorArray([...currentColorArray])
  },1000)
  return () => clearInterval(timer)

}, [checkColumnOfFour, checkRowOfFour, checkColumnOfThree, checkRowOfThree, moveSquareBelow, setCurrentColorArray])
console.log (currentColorArray)

  return (
    <div className="App">
      <div className="game">
        {currentColorArray.map((candyColor, index : number) => (
          <img
            key = {index}
            style={{backgroundColor: candyColor}}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
