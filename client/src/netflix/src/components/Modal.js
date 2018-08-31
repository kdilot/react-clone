import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon, Input, Card } from 'antd';
import Store from 'context/store';

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
const SearchResult = styled.div`
  padding: 0 1.5em;
  height: 90vh;
  overflow: auto;
  background: black;

  p {
    padding: 0;
    display: flex;
    align-items: center;
    color: white;
    height: 100%;
  }

  .ant-card-grid {
    box-shadow: 
    1px 0 0 0 black, 
    0 1px 0 0 black, 
    1px 1px 0 0 black, 
    1px 0 0 0 black inset, 
    0 1px 0 0 black inset;
    padding: 3px;
  }
  .ant-card-grid:hover {
    box-shadow: 0 0 1px 1px white;
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
                <Input placeholder="Search" onChange={store.handleSearchList} />
              </Search>
              {store.searchList.length !== 0 ?
                (
                  <SearchResult>
                    <Card>
                      {store.searchList.map(children => {
                        return (
                          children.backdrop_path ?
                            (
                              <Card.Grid style={{ width: '20%', textAlign: 'center' }} onClick={() => { store.handleMovieModal(children) }}>
                                <img alt={children.title} style={{ width: '100%' }} src={store.imgSize.small + children.backdrop_path} />
                              </Card.Grid>
                            ) : ('')
                        )
                      }
                      )}
                    </Card>
                  </SearchResult>
                ) : (
                  <Result>
                    <h1>Enter the content to search</h1>
                  </Result>
                )}
            </Wrapper>
          )
        }}
      </Store.Consumer>
    )
  }
}

// export default onClickOutside(Modal);
export default Modal;