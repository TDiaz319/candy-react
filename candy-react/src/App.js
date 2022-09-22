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

  const checkColumnOfThree = () => {
    for(let i = 0; i<47; i++) {
      const columnOfThree = [i, i + width, i + width *2]
      const decidedColor = currentColorArray[i]

      if (columnOfThree.every(square => currentColorArray[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArray[square] ='')
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
    setCurrentColorArray([...currentColorArray])
  },100)
  return () => clearInterval(timer)

}, [checkColumnOfFour, checkColumnOfThree, setCurrentColorArray])
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
