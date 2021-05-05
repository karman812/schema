import React from "react";
import {Col, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import styles from './PlaceList.module.css'
import {Button} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const PlaceList = (props) => {

    return (
        <Col xs={3} className={styles.navCol}>
            <Row className={styles.buildingsRow}>
                <Col>
                    {props.getBuildingsHtml()}
                </Col>
            </Row>
            <Row className={styles.buttonsRow}>
                <Col className={styles.buttonsCol} xs={12}>
                    <Row>
                        <Col xs={12} className={styles.inventoryButton}>
                            <NavLink to='/add' className={styles.nav_item} activeClassName={styles.nav_item_active}><Button
                                className={styles.nav_item_button} size='large' variant="contained" color="primary"
                                startIcon={<AddIcon/>}>Добавить инвентарь</Button></NavLink>
                        </Col>
                        <Col xs={12} className={styles.inventoryButton}>
                            <NavLink to='/edit' className={styles.nav_item} activeClassName={styles.nav_item_active}><Button
                                className={styles.nav_item_button} size='large' variant="contained" color="default"
                                startIcon={<EditIcon/>}>Обновить инвентарь</Button></NavLink>
                        </Col>
                        <Col xs={12} className={styles.inventoryButton}>
                            <NavLink to='/delete' className={styles.nav_item} activeClassName={styles.nav_item_active}><Button
                                className={styles.nav_item_button} size='large' variant="contained" color="secondary"
                                startIcon={<DeleteIcon/>}>Удалить инвентарь</Button></NavLink>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Col>
    )
}

export default PlaceList