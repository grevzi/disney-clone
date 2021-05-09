import styled from "styled-components";
import {auth, provider} from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router";
import {selectUserName, selectUserPhoto, setUserLoginDetail} from "../features/user/userSlice";

const Header = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)
    const handleAuth = () => {
        auth.signInWithPopup(provider).then(result => {
            const {user} = result
            dispatch(setUserLoginDetail({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            }))
        }).catch(error => console.error(error.message))
    }
    return (
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="Disney +"/>
            </Logo>

            {!userName
                ? <Login onClick={handleAuth}>Login</Login>
                :
                <>
                <NavMenu>
                    <a href="/home">
                        <img src="/images/home-icon.svg" alt="home"/>
                        <span>HOME</span>

                    </a>
                    <a href="/search">
                        <img src="/images/search-icon.svg" alt="SEARCH"/>
                        <span>SEARCH</span>

                    </a>
                    <a href="/watchlist">
                        <img src="/images/watchlist-icon.svg" alt="WHATCHLIST"/>
                        <span>WHATCHLIST</span>

                    </a>
                    <a href="/original">
                        <img src="/images/original-icon.svg" alt="ORIGINALS"/>
                        <span>ORIGINALS</span>

                    </a>
                    <a href="/movies">
                        <img src="/images/movie-icon.svg" alt="MOVIES"/>
                        <span>MOVIES</span>

                    </a>
                    <a href="/series">
                        <img src="/images/series-icon.svg" alt="SERIES"/>
                        <span>SERIES</span>
                    </a>
                </NavMenu>
                    <UserImage src={userPhoto} alt={userName} />
                </>
            }
        </Nav>
    );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-flow: row nowrap;
  height: 100%;
  margin: 0 auto 0 25px;
  padding: 0;
  position: relative;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0;
      white-space: nowrap;
      position: relative;

      &:before {
        content: '';
        background-color: rgb(249, 249, 249);
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        height: 2px;
        opacity: 0;
        position: absolute;
        left: 0;
        right: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.075, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1;
        width: 100%;
      }
    }
  }


  //@media(max-width: 768px) {
  //  display: none;
  //}
`

const Login = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  color: #f9f9f9;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease-out;
  
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`

const UserImage = styled.img`
  height: 100%;
`

export default Header;