import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import {useDispatch, useSelector} from "react-redux";
import {setMovies} from "../features/movie/movieSlice";
import {useEffect} from "react";
import db from '../firebase'
import {selectUserName} from "../features/user/userSlice";

const Home = props => {
    const dispatch = useDispatch()
    const userName = useSelector(selectUserName)
    let recommends = []
    let newDisneys = []
    let originals = []
    let trendings = []

    useEffect(() => {
        db.collection('movies').onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                switch (doc.data().type) {
                    case 'recommend':
                        recommends = [...recommends, {id: doc.id, ...doc.data()}]
                        return recommends
                        break;
                    case 'new':
                        newDisneys = [...newDisneys, {id: doc.id, ...doc.data()}]
                        return newDisneys
                        break;
                    case 'original':
                        originals = [...originals, {id: doc.id, ...doc.data()}]
                        return originals
                        break;
                    case 'trending':
                        trendings = [...trendings, {id: doc.id, ...doc.data()}]
                        return trendings
                        break;
                }
            })

            dispatch(setMovies({
                recommended: recommends,
                newDisney  : newDisneys,
                original   : originals,
                trending   : trendings
            }))
        })

    }, [userName])

    useEffect(() => {
        document.title = "Home | Disney Plus"
    }, []);

    return (
        <Container>
            <ImgSlider/>

            <Viewers/>

            <Recommends/>

            <NewDisney/>

            <Originals/>

            <Trending/>
        </Container>
    );
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    content: '';
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    position: absolute;
    inset: 0;
    z-index: -1;
  }
`

export default Home