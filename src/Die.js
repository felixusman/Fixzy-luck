
import React from "react"

export default function Die(props) {
/**The styles below is responsible for changing the color of the die when it is held */
    const styles = {
        backgroundColor: props.isHeld ? "rgb(100, 50, 100)" : "white"
    }
    /**After passing the holdDice property to each die in App.js, we have to recieve that 
     * props here through a onClick event else it won't work.
     */
    if(props.value===1){
        return <span className="die-face"
                     style={styles}
                     onClick={props.holdDice}>
                     <span className="one"></span>
                     </span>
    }else if(props.value===2){
        return (<span className="die-face"
                     style={styles}
                     onClick={props.holdDice}>
                     <div><span className="two"></span>
                     <span className="t"></span><br/></div>
                     <div><br/><span className="two"></span>
                     </div>
                     </span>
        )
    }else if(props.value===3){
        return (<span className="die-face"
                     style={styles}
                     onClick={props.holdDice}>
                         <div><span className="tw"></span><br/>
                         <span className="two"></span></div>
                         <div><span className="two"></span></div>
                         <div><span className="two"></span><br/>
                         <span className="tw"></span></div>
                     </span>
        )
    }else if(props.value===4){
        return (<span className="die-face"
                     style={styles}
                     onClick={props.holdDice}>
                     <div><span className="two"></span><br/>
                     <span className="two"></span></div>
                     <div><span className="two"></span><br/>
                     <span className="two"></span></div>
                     </span>
        )
    }else if(props.value===5){
        return (<span className="die-face"
                     style={styles} 
                     onClick={props.holdDice}>
                     <div><span className="five"></span><br />
                     <span className="five"></span></div>
                     <div><span className="five"></span></div>
                     <div><span className="five"></span><br/>
                     <span className="five"></span></div>
                     </span>
        )
    }else if(props.value===6){
        return (<span className="die-face"
                     style={styles}
                     onClick={props.holdDice}>
                     <div><span className="five"></span><br/>
                     <span className="five"></span></div>
                     <div><span className="five"></span><br/>
                     <span className="five"></span></div>
                     <div><span className="five"></span><br />
                     <span className="five"></span></div>
                     </span>
        )
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}