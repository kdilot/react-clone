import React, { Component } from 'react';
import { Avatar, Icon } from 'antd';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import Store from 'context/store'

const Content = styled.div`
 .fade-enter {
    transform: translateX(50%);
  }
  .fade-enter-active {
    transform: translateX(0%);
    transition: all 200ms ease-out;
  }
  .fade-exit {
    transform: translateX(-30%);
  }
  .fade-exit-active {
    transform: translateX(0%);
    transition: all 200ms ease-out;
  }

`
const Wrapper = styled.div`
  padding: 1em 1.5em;
  border-bottom: 2px solid black;
  display: flex;
  color: white;
  vertical-align: center;

  h3 {
    color: white;
    margin: auto 0;
    margin-left: 1em;
    font-size: 1.5em;
  }

  h2 {
    color: white;
    margin: auto 0;
    font-size: 1.3em;
    font-weight: normal;
  }

  h2.h2-lf {
    width: 100vw;
    text-align: center;
  }

  .header-icon {
    position: absolute;
    right: 0.5em;
    margin-top: 0.6em;
  }

  .icon {
    position: absolute;
    right: 0.5em;
    margin-top: 0.3em;
  }
  
  .icon-lf {
    position: absolute;
    left: 0.5em;
    margin-top: 0.3em;
  }
`
const List = styled.div`
  padding: 1em 1.5em;
  color: white;

  p {
    padding: 0;
    margin: 0;
    font-size: 1.3em;
  }

  :hover {
    background: #404040;
  }
`
const OptionList = styled.div`
  padding: 0.5em 1.5em;
  display: flex;

  .img {
    display: flex;
    width: 30%;
    height: 3em;
    background: white;
  }

  p {
    display: flex;
    width: 70%;
    padding: 0;
    margin: 0;
    margin-left: 5px;
    word-break: break-all;  
    white-space: nowrap;
    overflow: hidden
  }
`

class SideMenu extends Component {

  handleDisplay = () => {
    const { display } = this.state
    this.setState({ display: !display })
  }

  state = {
    display: true,
  }

  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <Content>
              <CSSTransition
                in={!this.state.display}
                classNames="fade"
                timeout={200}>
                <div>
                  <div style={{ display: this.state.display ? 'block' : 'none' }}>
                    <Wrapper onClick={store.handleProfile}>
                      <Avatar shape="square" size={50} icon="user" style={{ backgroundColor: store.user[store.currentUser].color }} />
                      <h3>{store.user[store.currentUser].name}</h3>
                      <Icon type="swap" className="header-icon" style={{ fontSize: 24 }} />
                    </Wrapper>
                    <Wrapper onClick={this.handleDisplay}>
                      <h2>Notifications</h2>
                      <Icon type="right" className="icon" style={{ fontSize: 20 }} />
                    </Wrapper>
                    <List className={store.menuSelected === 'Home' ? 'selected' : ''} onClick={() => { store.handleMenu('Home') }}><p>Home</p></List>
                    <List className={store.menuSelected === 'Action' ? 'selected' : ''} onClick={() => { store.handleMenu('Action') }}><p>Action</p></List>
                    <List className={store.menuSelected === 'Adventure' ? 'selected' : ''} onClick={() => { store.handleMenu('Adventure') }}><p>Adventure</p></List>
                    <List className={store.menuSelected === 'Animation' ? 'selected' : ''} onClick={() => { store.handleMenu('Animation') }}><p>Animation</p></List>
                    <List className={store.menuSelected === 'Drama' ? 'selected' : ''} onClick={() => { store.handleMenu('Drama') }}><p>Drama</p></List>
                    <List className={store.menuSelected === 'Horror' ? 'selected' : ''} onClick={() => { store.handleMenu('Horror') }}><p>Horror</p></List>
                  </div>
                  <div style={{ display: !this.state.display ? 'block' : 'none' }}>
                    <Wrapper onClick={this.handleDisplay}>
                      <Icon type="left" className="icon-lf" style={{ fontSize: 20 }} />
                      <h2 className="h2-lf">Notifications</h2>
                    </Wrapper>
                    {store.list.filter(_children => _children.backdrop_path).slice(0, 15).map(children => {
                      return (
                        <OptionList key={children.title} onClick={() => { store.handleMovieModal(children) }}>
                          <div className="img"><img alt={children.title} style={{ width: '100%' }} src={store.imgSize.small + children.backdrop_path} /></div>
                          <p>
                            Suggestion for You
                            <br />
                            {children.title}
                          </p>
                        </OptionList>
                      )
                    })}
                  </div>
                </div>
              </CSSTransition>
            </Content>
          )
        }}
      </Store.Consumer>
    )
  }
}

export default SideMenu;