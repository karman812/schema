import React from 'react';
import styles from './FormsControls.module.css';
import {TextField} from "@material-ui/core";


export const Textarea = ({input, meta, ...props}) => {
    return (
        <div className={styles.formControl + ' ' + styles.error}>
            <div>
                <TextField variant="outlined" label="Заполните поле" {...input} {...props}/>
            </div>
            {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>

    )
}
