
import React from "react"
import Die from "./Die"
import Alert from "./Alert"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [masterDie, setMasterDie] = React.useState(generateMasterDie() && {number: -2})
    const [darkMode, setDarkMode] = React.useState(false)
    const [teach, setTeach] = React.useState(false)

    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode)
    }
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])    

    function generateNewDie() { 
        return {
            value: Math.ceil(Math.random() * 6 ),
            isHeld: false,
            id: nanoid()
        }
    }
    
          
    function generateMasterDie() { 
        let max = 26
        let min = 10
        return {
            number: Math.floor(Math.random() * (max - min) + min),
            id: nanoid(),
            disabled: false
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
   

    function rollDice() {
        if(!tenzies) {  
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }
            ))
       setMasterDie(prevDie => ({number: prevDie.number - 1}))
             if(masterDie.number === -1){     
                setMasterDie(prevNum => ({number: prevNum.number=-2}))
                setTenzies(false)
                setDice(allNewDice())
             }
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setMasterDie(prevNum => ({number: prevNum.number=-2}))
            
        }
       
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
        
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)} 
        />
    ))
    function handleMaster() {
        return setMasterDie(generateMasterDie())
    }
    
    function handleReset() {
        setTenzies(false)
        setDice(allNewDice())
        setMasterDie(prevNum => ({number: prevNum.number=-2}))
         
     }
     function handleTutorial() {
        setTeach(!teach)
     }
     
    return (
        <main className={darkMode ? "dark" : ""}>
            {tenzies && <Alert type="success"><h2 className="win">YOU WINNNN !!! CONGRATULATIONS</h2></Alert>}
            {tenzies && <Confetti />}
            <div className="headbtn"><h5 className="title"><b>FIXZY-LUCK</b></h5>
             <div className="dropdown">
               <button className="dropbtn">Settings</button>
               <div className="dropdown-content">
               <a onClick={toggleDarkMode}>Dark-Mode</a>
               <a onClick={handleReset}>Reset Game</a>
               <a onClick={handleTutorial}>Tutorial</a>
               </div>
            </div>
            </div>
            
            {teach ? <p className="learn">To play the fixzy-luck, click on the button labeled "Chances" to generate a random
                number of chances that will determine the number of times you will be permitted 
                to roll the dice before the game is over.<br />

                Click on a die to hold it in place while you roll the other dice to turn up with thesame
                number as the one held.<br />

                The game will be over if you run out of chances withought flipping all the dices to have 
                thesame number on their faces.<br/>
                When you are done reading, return to settings and click on tutorial to close this page</p> : ""}
            {masterDie.number === -1 && <Alert type="error"><h2 className="lose">GAME OVER TRY AGAIN</h2></Alert>}
            {masterDie.number > -1 ? <button id="master-die">{masterDie.number}</button> :
            <button onClick={handleMaster} className="master-die">Chances</button>}
            <div className="dice-container">
                {diceElements}
            </div>
            
            {masterDie.number >= 0 && <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>}
        </main>
    )
}
