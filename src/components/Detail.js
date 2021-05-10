import styled from "styled-components";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import db from "../firebase";

const Detail = props => {

    const {id} = useParams()
    const [detailData, setDetailData] = useState()
    useEffect(() => {
        db.collection('movies').doc(id).get()
            .then(doc => {
                if (doc.exists) {
                    console.log(doc.data());
                    setDetailData(doc.data())
                } else {
                    console.error('No such doc in the firebase DB 🔥')
                }
            })
            .catch(error => console.error(error.message))
    }, [id])

    console.log(detailData);

    if (!detailData) return (
        <Container>Loading...</Container>
    )

    return (
        <Container>
            <Background>
                <img alt={detailData.title}
                     src={detailData.backgroundImg}/>
            </Background>
            <ImageTitle>
                <img alt={detailData.title}
                     src={detailData.titleImg}/>
            </ImageTitle>

            <ContentMeta>
                <Controls>
                    <Player>
                        <img alt="title" src="/images/play-icon-black.png"/>
                        <span>Play</span>
                    </Player>
                    <Trailer>
                        <img alt="title" src="/images/play-icon-white.png"/>
                        <span>Trailer</span>
                    </Trailer>
                    <AddList>
                        <span/>
                        <span/>
                    </AddList>
                    <GroupWatch>
                        <img alt="title" src="/images/group-icon.png"/>
                    </GroupWatch>
                </Controls>

                <SubTitle>{detailData.subTitle}</SubTitle>
                <Description>{detailData.description}</Description>
            </ContentMeta>
        </Container>
    )
}


const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`

const Background = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100vw;
    height: 100vh;
    @media (max-width: 768px) {
      width: initial;
    }
  }
`;
const ImageTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 0 auto;
  height: 30vw;
  min-height: 170px;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin-bottom: calc(3vw + 5px);
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0 22px 0 0;
  padding: 0 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background-color: rgb(249, 249, 249);
  border: none;
  color: rgba(0, 0, 0);
  cursor: pointer;
  height: 65px;


  img {
    width: 32px;
  }

  &:hover {
    background: rgba(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 12px;
    font-size: 12px;
    margin: 0 10px 0 0;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

const AddList = styled.button`
  margin-right: 16px;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-right: 8px;

    width: 45px;
    height: 45px;
  }

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;

    &:first-child {
      height: 2px;
      transform: translate(1px);
      width: 16px;
    }

    &:last-child {
      height: 16px;
      transform: translate(-8px);
      width: 2px;
    }
  }
`;

const GroupWatch = styled.button`
  width: 65px;
  height: 65px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background-color: #000;
  border-radius: 50%;
  border: 2px solid #fff;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }

  img {
    width: 100%;
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail