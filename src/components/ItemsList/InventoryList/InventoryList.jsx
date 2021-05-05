import React from "react";
import {Col} from "react-bootstrap";
import styles from './InventoryList.module.css'

const InventoryList = (props) => {
    let inventoryItems

    if (props.viewingPlaceId) {
        let inventory = props.getChoosingInventoryItem(props.viewingPlaceId)

        inventoryItems = inventory.map(el => {
            if (!el) return undefined
            else {
                return <div className={styles.inventoryInfoCol}>
                    <span className={styles.inventoryName}>Название: {el.data.name}</span>
                    <span className={styles.inventoryCount}>Количество: {el.data.count}</span>
                </div>
            }
        })
    }

    return (
        <Col className={styles.inventoryCol} xs={7}>
            <div className={styles.inventoryInfoCol}>
                <span className={styles.inventoryPlace}>{props.viewingPlaceName ? props.viewingPlaceName : null}</span>
                <div>
                    {props.viewingPlaceName && inventoryItems && inventoryItems.length > 0
                        ? inventoryItems
                        : props.viewingPlaceName
                            ? <span>Кажется, тут нет инвентаря</span>
                            : <span>Кажется, тут нет инвентаря</span>
                    }
                </div>
            </div>
        </Col>
    )
}

export default InventoryList