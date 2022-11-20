import React, {useState} from 'react';

import 'antd/dist/antd.css';
import './App.scss';
import Login from "./Login/Login";
import { Modal } from 'react-components-free';
import Main from "./Main/Main";
import {IUser} from "../interfaces/User";



function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<any>(false);


    return (
      <>
          {(!isLoggedIn) ?
          <Modal closable={false}>
            <Login
                successLogin={(loginResponse: IUser)=>{
                    setIsLoggedIn(true);
                }}
            />
          </Modal>
          :
          <Main/>}
      </>
  );
}

export default App;
