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
