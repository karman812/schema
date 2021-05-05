import {addInventory, deleteInventory, getInventory, getPlaces, initializeApp, updateInventory} from "../api/api";

const SET_DATA = 'SET-DATA'
const SET_PLACES_HIERARCHY = 'SET_PLACES_HIERARCHY'
const SET_VIEWING_PLACE = 'SET-VIEWING-PLACE'


const initialState = {
    places: [],
    inventory: [],
    placesData: [],
    viewingPlaceId: undefined,
    viewingPlaceName: undefined,
    inventoryPlaces: []
}

let reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA: {
            let copyState = {
                ...state,
                places: [...action.places],
                inventory: [...action.inventory]
            }
            return copyState
        }
        case SET_PLACES_HIERARCHY: {
            let copyState = {
                ...state,
                placesData: action.placesData,
                inventoryPlaces: action.inventoryPlaces
            }
            return copyState
        }
        case SET_VIEWING_PLACE: {
            let copyState = {
                ...state,
                viewingPlaceId: action.placeId,
                viewingPlaceName: action.placeName
            }
            return copyState
        }
        default:
            return state

    }
}
export const setData = (places, inventory) => {
    return {
        type: SET_DATA,
        places,
        inventory
    }
}
export const setViewingPlace = (placeId, placeName) => {
    return {
        type: SET_VIEWING_PLACE,
        placeId,
        placeName
    }
}
export const setPlacesHierarchy = (placesData, inventoryPlaces) => {
    return {
        type: SET_PLACES_HIERARCHY,
        placesData,
        inventoryPlaces,
    }
}

export const getDataThunkCreator = () => {
    return async (dispatch) => {
        initializeApp()
        let places = await getPlaces()
        let inventory = await getInventory()
        dispatch(setData(places, inventory))
    }
}
export const addInventoryThunkCreator = (name, count, placeId) => {
    return async (dispatch) => {
        await addInventory(name, count, placeId)
    }
}
export const deleteInventoryThunkCreator = (inventoryId) => {
    return async (dispatch) => {
        await deleteInventory(inventoryId)
    }
}
export const editInventoryThunkCreator = (inventoryId, count) => {
    return async (dispatch) => {
        await updateInventory(inventoryId, count)
    }
}

export default reducer