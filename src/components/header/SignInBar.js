import React from 'react';
import { Link } from 'react-router-dom';
import { signOut, signIn } from '../../actions';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

//
// each function component is independent, isolated and testable.
// state is managed inside the component itself
//

// USER INFO
function UserInfoButton() {
  const _userName = useSelector((state) => state.user.name)

  return <button onClick={() => { }}>{_userName ?? 'AB'}</button>
};

// SIGNOUT
const SignOutButton = ({ onClicked }) => {
  const { t, } = useTranslation();

  console.log(`onClicked, ${onClicked}`)
  console.log(`JSON.stringify(onClicked), ${JSON.stringify(onClicked)}`)

  return <button onClick={onClicked}>{t('top-menu.signout')}</button>
};

// SIGNIN
function SignInButton() {
  const navigate = useNavigate();
  const { t, } = useTranslation();
  const dispatch = useDispatch()

  return <button onClick={() => {
    dispatch(signIn())
    navigate('/signin')
  }}>{t('top-menu.signin')}</button>
}

// REGISTER
function RegisterButton() {
  const navigate = useNavigate();
  const { t, } = useTranslation();
  const dispatch = useDispatch()

  return <button onClick={() => {
    dispatch(signIn())
    navigate('/register')
  }}>{t('top-menu.register')}</button>
}



function SignInBar() {
  const isUserSignedIn = useSelector((state) => state.user.isUserSignedIn)
  const navigate = useNavigate();
  const { t, } = useTranslation();
  const dispatch = useDispatch()

  const handleSignOut = () => {
    dispatch(signOut())
    navigate('/')
  }; 

  const signedInButtons =
    <>
      <UserInfoButton />
      <SignOutButton onClicked={handleSignOut} />
    </>;

  const signedOutButtons =
    <>
      <RegisterButton />
      <SignInButton />
    </>

  return (<>
    {isUserSignedIn ?
      signedInButtons :
      signedOutButtons
    }
  </>)
}

export default SignInBar
