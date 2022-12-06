
import React from "react"
import Die from "./Die"
import Alert from "./Alert"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {

    const [dice, setDice] = React.useState(allNewDice())/*initializing this state with allNewDice() will load new
                                                       dice as soon as the component loads*/
    const [tenzies, setTenzies] = React.useState(false)/*This state determines whether the game is won or not. we
                                                       initialize it as false so that they won't win the game 
                                                       the moment the game loads*/
    const [masterDie, setMasterDie] = React.useState(generateMasterDie() && {number: -2})
    const [darkMode, setDarkMode] = React.useState(false)
    const [teach, setTeach] = React.useState(false)
    const [points, setPoints] = React.useState({highest: 52, lowest: 0})


    function handleRoll() {
       setPoints(prevPoint => ({highest: prevPoint.highest -2}))
      
    }

    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode)
    }
/*The reason for using useEffect is so that we can deal with
things that are coming from outside, but when you are deeling
2 or more pieces of states, you also need a useEffect to 
keep them in sync*/
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)//check if all the dies are held
        const firstValue = dice[0].value//lets use the first die as a reference point
        const allSameValue = dice.every(die => die.value === firstValue)//if they are all held, then they should all have thesame value with the first die
        if (allHeld && allSameValue){
            setTenzies(true)
        }
    }, [dice])    
/**Below is the function that generates the value of each die*/
    function generateNewDie() { 
        return {
            value: Math.ceil(Math.random() * 6 ),
            isHeld: false,
            id: nanoid()
        }
    }
/*The func below assigns the values number, id, and disabled to the master
die. It initializes the disabled property to false and it recieves a new
nanoid each time the function is called. The number value is calculated
randomly using the values of the variables max and min as constraints */  
          
    function generateMasterDie() { 
        let max = 26
        let min = 10
        return {
            number: Math.floor(Math.random() * (max - min) + min),
            id: nanoid(),
            disabled: false
        }
    }
    
/*This func below, initializes an empty newDice array and populate it
with 10 dices each having new random numbers.
each time the loop iterates, it generates a new die by calling the 
generateNewDie() function*/
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
   function handleNewGame() {
    setPoints(points.highest = 0)
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
/**The func below maps over the dice array in the state, and
 * compares their id with the id that was passed in through
 * the func when the die was clicked. When it finds the id
 * that match, it flips the isHeld value of that die */    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
        
    }
  /*There are 10 different dice on board, the func below will map over
  the dice state which has 10 numbers(dies) in it, and each of those numbers
  will be assigned to a die component. So 10 Die components will be generated
  with each having 4 different values.*/
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}/**Each time a die is clicked, this holdDice
                                                func will be called with die.id as the 
                                                parameter. This way, each die can flip its
                                                isHeld value independently. It recieves the
                                                id property so that it can identify which die
                                                was clicked*/
        />
    ))
    function handleMaster() {
         setMasterDie(generateMasterDie());
               setDice(allNewDice());
               setPoints(prevPoint => ({highest: prevPoint.highest = 52}))
        
    }
    /*When the reset button is clicked, all states in the func below will
    reset to their default values */
    
    function handleReset() {
        setTenzies(false)
        setDice(allNewDice())
        setMasterDie(prevNum => ({number: prevNum.number=-2}))
            
     }
/**The initial value of the state in the func below was false, so when
 * this func is called, its value will keep toggling between true and false.
 */
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
                {/*conditional rendering of two buttons below */}
                {tenzies ? <button className="roll-dice" onClick={handleNewGame}>New Game</button> : <button className=
                    "roll-dice" onClick = {handleRoll}>Roll</button>}
            </button>}
            <div className="extend">{tenzies && <p>Score: {points.highest}</p>}</div>
        </main>
    )
}
