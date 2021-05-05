import React from "react";
import {FormControlLabel, Radio} from "@material-ui/core";

const EditInventoryItem = (props) => {
    return <FormControlLabel value={props.id} control={<Radio color={'default'}/>} label={props.name} checked={props.isChecked}/>
}

export default EditInventoryItem