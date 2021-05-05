import React, {useState} from "react";
import ChangeInventoryItem from "../ChangeInventoryItem";
import {Button, RadioGroup} from "@material-ui/core";
import styles from './DeleteInventory.module.css'

const DeleteInventory = (props) => {
    let [newPlaceId, setNewPlaceId] = useState(undefined)
    let places = props.getUpdateInventoryList()

    let inventoryItems = []

    places.map(inventoryItem => {
        inventoryItem.inventory.forEach(el => {
            inventoryItems.push([el.data.name, el.id])
        })
    })

    let onChange = (e) => {
        setNewPlaceId(e.target.value)
    }

    let getInventory = inventoryItems.map(el => {
        return <ChangeInventoryItem name={el[0]} id={el[1]} setNewPlaceId={setNewPlaceId} color='secondary'/>
    })

    let deleteInventory = async () => {
        if (newPlaceId) {
            await props.deleteInventory(newPlaceId)
            props.rerenderComponent()
        }
    }

    return (
        <div className={styles.deleteInventoryCol}>
            <div className={styles.title}>Удаление инвентаря</div>

            <div className={styles.chooseTitle}>Выберете элемент</div>
            <div>
                <RadioGroup onChange={onChange}>{getInventory}</RadioGroup>
            </div>
            <div>
                <Button onClick={event => deleteInventory()} type="submit" size='large' variant="contained"
                        color="secondary">Удалить</Button>
            </div>
        </div>
    )
}

export default DeleteInventory