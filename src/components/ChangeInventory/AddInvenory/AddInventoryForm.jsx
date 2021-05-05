import {maxLengthCreator, requiredField, isNumber} from "../../../validators/validators";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormControls/FormControls";
import {Button, RadioGroup, Select} from '@material-ui/core';
import ChangeInventoryItem from "../ChangeInventoryItem";
import styles from './AddInventory.module.css'


const maxlength20 = maxLengthCreator(20)
const maxlength5 = maxLengthCreator(5)


const TextareaForm = (props) => {

    let onChange = (e) => {
        return props.setNewPlaceId(e.target.value)
    }
    let places = props.places.map((el, i) => {
        return <ChangeInventoryItem key={i} name={el.data.name} id={el.id} isChecked={el.id == props.newPlaceId}
                                    color='primary'/>
    })

    const RadioButtonGroup = (props) => {
        return <RadioGroup {...props} onChange={onChange}>{places}</RadioGroup>
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='buttons' component={RadioButtonGroup}/>
            </div>
            <div className={styles.textField}>
                <Field component={Textarea} placeholder='введите название элемента' type='text' name='addInventoryName'
                       validate={[requiredField, maxlength20]}/>
            </div>
            <div className={styles.textField}>
                <Field component={Textarea} placeholder='введите число элементов' type='number' name='addInventoryCount'
                       validate={[requiredField, isNumber, maxlength5]}/>
            </div>
            <Button type="submit" size='large' variant="contained" color="primary">Добавить</Button>
        </form>
    )
}

export let AddInventoryForm = reduxForm({form: "addInventoryForm"})(TextareaForm)