import {FormControlLabel, Radio} from "@material-ui/core";

import React from "react";


const ChangeInventoryItem = (props) => {

    return (
        <FormControlLabel value={props.id} control={<Radio color={props.color}/>} label={props.name}
                          checked={props.isChecked}/>
    )
}

export default ChangeInventoryItem