import React, {useState} from "react";
import {AddInventoryForm} from "./AddInventoryForm";
import styles from './AddInventory.module.css'

const AddInventory = (props) => {

    let [newPlaceId, setNewPlaceId] = useState(undefined)

    let placesArr = props.getAddInventoryList()

    let addNewInventoryName = (value) => {
        addInventory(value.addInventoryName, value.addInventoryCount, newPlaceId)
    }
    let addInventory = async (InventoryName, InventoryCount, newPlaceId) => {
        if (newPlaceId && InventoryName && InventoryCount) {
            await props.addNewInventory(InventoryName, InventoryCount, newPlaceId)
            props.rerenderComponent()
        }
    }

    return (
        <div className={styles.addInventoryCol}>
            <div className={styles.title}>ДОБАВЛЕНИЕ ИНВЕНТАРЯ</div>
            <div className={styles.chooseTitle}>Пожалуйста, выберете место</div>

            <div>
                <AddInventoryForm onSubmit={addNewInventoryName} places={placesArr} setNewPlaceId={setNewPlaceId}
                                  newPlaceId={newPlaceId}/>
            </div>
        </div>
    )
}

export default AddInventory