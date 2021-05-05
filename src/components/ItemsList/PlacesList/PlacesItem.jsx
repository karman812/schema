import React, {useState} from "react";
import styles from './PlaceItem.module.css'
import {Link} from "react-router-dom";


let PlacesItem = (props) => {
    let [isClicked, setIsClicked] = useState(false)
    let placeOnClick = (e) => {
        setIsClicked(true)

    }

    let getInventoryList = () => {
        props.setViewingPlace(props.id, props.placeName)
        placeOnClick()
    }

    return (
        <div className={styles.main} onClick={event => placeOnClick(event)}>

            {props.childPlaces
                ? <div className={isClicked ? styles.clickedPlace : styles.main}><span
                    onClick={event => getInventoryList()}><Link
                    to={'/inventory'}>{props.placeName}</Link></span>{props.childPlaces}</div>
                : <span onClick={event => getInventoryList()}><Link to={'/inventory'}>{props.placeName}</Link></span>
            }

        </div>
    )
}

export default PlacesItem