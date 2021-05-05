import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    addInventoryThunkCreator,
    deleteInventoryThunkCreator, editInventoryThunkCreator,
    getDataThunkCreator,
    setPlacesHierarchy,
    setViewingPlace
} from "../../redux/reducer";
import InventoryList from "./InventoryList/InventoryList";
import PlaceList from "./PlacesList/PlacesList";
import {Col, Row} from "react-bootstrap";
import styles from "./PlacesList/PlaceList.module.css"
import PlacesItem from "./PlacesList/PlacesItem";
import {BrowserRouter, Switch} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import EditInventory from "../ChangeInventory/EditInventory/EditInventory";
import DeleteInventory from "../ChangeInventory/DeleteInventory/DeleteInventory";
import AddInventory from "../ChangeInventory/AddInvenory/AddInventory";


class ListContainer extends React.Component {

    componentDidMount = async () => {
        await this.props.getDataThunkCreator()
        let places = this.setInventoryOnPlaces([...this.props.inventory], [...this.props.places])
        this.props.setPlacesHierarchy(this.getBuildingsData(places), places)
    }

    rerenderComponent = async () => {
        await this.props.getDataThunkCreator()
        let places = this.setInventoryOnPlaces([...this.props.inventory], [...this.props.places])
        console.log(places)
        this.props.setPlacesHierarchy(this.getBuildingsData(places), places)
        this.setState({ms: "Rerender"});
    }

    getAddInventoryList = () => {
        return this.props.places.filter(el => !el.parts)
    }

    getUpdateInventoryList = () => {
        return this.props.places.filter(el => !el.parts && el.inventory && el.inventory.length > 0)
    }

    setInventoryOnPlaces = (inventory, places) => {
        inventory.forEach(inventoryItem => {
            places.forEach(placeItem => {
                if (!placeItem.inventory) {
                    placeItem.inventory = []
                }
                if (inventoryItem.placeId == placeItem.id) {
                    placeItem.inventory.push(inventoryItem)
                }
            })
        })
        return places
    }


    getPlacesHierarchy = (el, places, rooms) => {
        if (el.parts && !rooms.includes(el.id)) {

            let parts = el.parts.map(element => {
                let index = places.findIndex(k => k.id == element)
                rooms.push(el.id)

                if (places[index].parts) {
                    return this.getPlacesHierarchy(places[index], places, rooms)
                }
                if (places[index]) {
                    return places[index]
                }
            })
            let inventory = el.parts.map(element => {
                let index = places.findIndex(k => k.id == element)
                rooms.push(el.id)

                if (places[index].inventory) {
                    return places[index].inventory
                }
                if (places[index].parts) {
                    return this.getPlacesHierarchy(places[index], places, rooms)
                }
            })
            return {
                ...el,
                places: parts,
                inventory: inventory.filter(el => el.length > 0)
            }
        }
        rooms.push(el.id)
    }

    getBuildingsData = (places) => {
        let rooms = []
        let buildings = places.map((el) => {
            let Buildings = this.getPlacesHierarchy(el, [...places], rooms)
            return Buildings
        })
        let newData = buildings.filter(el => el)
        newData[0].inventory = newData[0].places[0].inventory.concat(newData[0].places[1].inventory)
        return newData
    }

    getPlacesHtml = (el) => {
        if (el.places) {
            let PlacesHtml = el.places.map((element, i, array) => {
                if (element.places) {
                    return this.getPlacesHtml(element)
                }
                return <PlacesItem setViewingPlace={this.props.setViewingPlace} id={element.id}
                                   placeName={element.data.name} viewingPlaceId={this.props.viewingPlaceId}/>
            })
            return <PlacesItem setViewingPlace={this.props.setViewingPlace} id={el.id} childPlaces={PlacesHtml}
                               placeName={el.data.name} viewingPlaceId={this.props.viewingPlaceId}/>
        }
    }

    getBuildingsHtml = () => {
        let BuildingsHtml = this.props.state.placesData.map(el => {
            return this.getPlacesHtml(el)
        })
        return BuildingsHtml
    }

    getPlaceInventory = (item, desiredItemId) => {

        if (item.id == desiredItemId) {
            return item.inventory
        } else if (item.places) {
            let inventory = item.places.find(el => {
                return el.id == desiredItemId
            })
            if (inventory) {
                inventory = inventory.inventory
            }
            if (!inventory) {
                let a = item.places.map(el => {
                    inventory = this.getPlaceInventory(el, desiredItemId)
                    return inventory
                }).filter(el => el)
                return a
            }
            return inventory
        }
    }

    getChoosingInventoryItem = (viewingPlaceId) => {
        let desiredPlace = this.props.state.placesData.map(el => {
            return this.getPlaceInventory(el, viewingPlaceId).filter(element => element && element.length == undefined || element && element.length > 0)
        }).filter(el => el.length == undefined || el.length > 0)

        let place = desiredPlace.map(el => {
            if (el.length) {
                let unitedPlaces = []

                el.forEach(element => {
                    unitedPlaces = unitedPlaces.concat(element)
                })

                let element = unitedPlaces.filter(el => el)
                return element
            }
        })
        place = [].concat(place[0])
        return place
    }

    render = () => (
        <BrowserRouter basename={window.location.pathname || ''}>
            <Row className={styles.placesRow}>
                <PlaceList getBuildingsHtml={this.getBuildingsHtml} places={this.props.state.placesData}/>
                <Route path='/inventory' render={() => <InventoryList rerenderComponent={this.rerenderComponent}
                                                                      getChoosingInventoryItem={this.getChoosingInventoryItem}
                                                                      viewingPlaceId={this.props.viewingPlaceId}
                                                                      viewingPlaceName={this.props.viewingPlaceName}/>}/>
                <Route path='/edit' render={() => <EditInventory rerenderComponent={this.rerenderComponent}
                                                                 getUpdateInventoryList={this.getUpdateInventoryList}
                                                                 editInventory={this.props.editInventoryThunkCreator}/>}/>
                <Route path='/delete'
                       render={() => <DeleteInventory deleteInventory={this.props.deleteInventoryThunkCreator}
                                                      rerenderComponent={this.rerenderComponent}
                                                      getUpdateInventoryList={this.getUpdateInventoryList}/>}/>
                <Route path='/add' render={() => <AddInventory addNewInventory={this.props.addInventoryThunkCreator}
                                                               rerenderComponent={this.rerenderComponent}
                                                               getAddInventoryList={this.getAddInventoryList}/>}/>
            </Row>
            <Row>

            </Row>
        </BrowserRouter>


    )
}

let mapStateToProps = (state) => {
    return {
        state: state.page,
        inventory: state.page.inventory,
        places: state.page.places,
        viewingPlaceId: state.page.viewingPlaceId,
        viewingPlaceName: state.page.viewingPlaceName
    }
}

export default compose(connect(mapStateToProps, {
    getDataThunkCreator,
    setPlacesHierarchy,
    setViewingPlace,
    addInventoryThunkCreator,
    deleteInventoryThunkCreator,
    editInventoryThunkCreator
}))(ListContainer);