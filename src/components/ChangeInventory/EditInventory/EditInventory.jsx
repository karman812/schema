import React, {useState} from "react";
import {EditInventoryForm} from "./EditInventoryForm";
import styles from './EditInventory.module.css'


const EditInventory = (props) => {

    let [newPlaceId, setNewPlaceId] = useState(undefined)
    let places = props.getUpdateInventoryList()

    let inventoryItems = []

    places.map(inventoryItem =>{
        inventoryItem.inventory.forEach(el =>{
            inventoryItems.push([el.data.name, el.id])
        })
    })

    let editInventory = async (value) =>{
        if(value.editInventoryCount && newPlaceId){
            await props.editInventory(newPlaceId,value.editInventoryCount)
            props.rerenderComponent()
        }
    }
    return (
        <div className={styles.editInventoryCol}>
            <div className={styles.title}>Обновление инвентаря</div>
            <div className={styles.chooseTitle}>Выберете инвентарь</div>
            <div>
                <EditInventoryForm onSubmit={editInventory} inventoryItems={inventoryItems} setNewPlaceId={setNewPlaceId} newPlaceId={newPlaceId}/>
            </div>
        </div>
    )
}

export default EditInventory