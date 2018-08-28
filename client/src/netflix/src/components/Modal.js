import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon, Input } from 'antd';
import Store from 'context/store';
// import onClickOutside from "react-onclickoutside";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  background: black;
  z-index: 100;
`
const Search = styled.div`
  padding: 0 1.5em;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .search-back {
    position: absolute;
    left: 1%;
  }

  input {
    width: 27em; 
    background: black;
    border: 2px solid gray;
    color: white;
  }

  input:hover {
    border: 2px solid white;
  }
`
const Result = styled.div`
  padding: 0 1.5em;
  height: 90vh;
  background: black;

  h1 {
    position: fixed;
    top: 50%;
    left: 40%;
    color: #FFF;
  }
`

class Modal extends Component {

  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <Wrapper style={{ display: store.searchDisplay }}>
              <Search>
                <Icon type="arrow-left" style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }} className="search-back" onClick={store.handleSearch} />
                <Icon type="search" style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }} />
                <Input placeholder="Search" />
              </Search>
              <Result>
                <h1>Enter the content to search</h1>
              </Result>
            </Wrapper>
          )
        }}
      </Store.Consumer>
    )
  }
}

// export default onClickOutside(Modal);
export default Modal;