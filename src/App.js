import logo from './logo.svg';
import './App.css';
import firebase from "firebase";
import ListContainer from "./components/ItemsList/ListContainer";
import {Col, Container} from "react-bootstrap";

function App() {
    return (
        <Container fluid className="App">
            <ListContainer/>
        </Container>
    );
}

export default App;
