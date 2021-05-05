import {maxLengthCreator, requiredField, isNumber} from "../../../validators/validators";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, RadioGroup} from "@material-ui/core";
import EditInventoryItem from "./EditInventoryItem";
import {Textarea} from "../../common/FormControls/FormControls";
import styles from './EditInventory.module.css'

const maxlength5 = maxLengthCreator(5)

const TextareaForm = (props) => {
    function onChange(e) {
        props.setNewPlaceId(e.target.value)
    }

    let inventory = props.inventoryItems.map(el => {
        return <EditInventoryItem name={el[0]} id={el[1]} isChecked={props.newPlaceId == el[1]}/>
    })
    const RadioButtonGroup = (props) => {
        return <RadioGroup {...props} onChange={onChange}>{inventory}</RadioGroup>
    }
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='buttons' component={RadioButtonGroup}/>
            </div>
            <Field component={Textarea} placeholder='введите число элементов' type='number' name='editInventoryCount'
                   validate={[requiredField, isNumber, maxlength5]}/>
            <Button className={styles.updateButton} type="submit" variant="contained" color="default">Обновить</Button>
        </form>
    )
}

export let EditInventoryForm = reduxForm({form: "editInventoryForm"})(TextareaForm)