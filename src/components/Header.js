import styled from "styled-components";
import {auth, provider} from "../firebase";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetail} from "../features/user/userSlice";
import {useEffect} from "react";

const Header = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)

    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if (user) {
                setUser(user)
                history.push('/home')
            }
        })
    }, [userName])

    const handleAuth = () => {
        if (!userName) {
            auth.signInWithPopup(provider)
                .then(result => {
                    setUser(result.user)
                })
                .catch(error => console.error(error.message))
        } else {
            auth.signOut()
                .then(result => {
                    dispatch(setSignOutState())
                    history.push('/')
                })
                .catch(error => console.error(error.message))
        }
    }

    function setUser(user) {
        dispatch(setUserLoginDetail({
            name : user.displayName,
            email: user.email,
            photo: user.photoURL,
        }))
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
                    <SignOut>
                        <UserImage src={userPhoto} alt={userName}/>
                        <DropDown>
                            <SignOutButton onClick={handleAuth}>Sign Out</SignOutButton>
                        </DropDown>
                    </SignOut>
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

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background-color: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0, 0, 0 / 50%) 0 0 18px 0;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${UserImage} {
    border-radius: 50%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition: all 0.25s ease-in-out;
    }
  }
`

const SignOutButton = styled.button`
  cursor: pointer;
  border: 1px solid transparent;
  background-color: transparent;
  color: #f9f9f9;
`

export default Header;