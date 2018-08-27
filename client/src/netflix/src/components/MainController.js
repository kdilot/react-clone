import React, { Component } from 'react';
import { Modal, SideMenu, ItemList, Profile } from 'components';
import Store from 'context/store';
import { Badge, Icon, Drawer } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  color: white;
`
const Header = styled.div`
  width: 100%;
  height: 10vh;
  padding: 1.5em;
  display: flex;
    /* justify-content: center; */
  align-items: center;

  h1 {
    /* margin: auto; */
    margin: 0;
    color: red;
    display: inline;
    padding-left: 1em;
  }
  
  .header-right {
    position: absolute;
    right: 2%;
  }
`
const Content = styled.div`
  width: 100%;
  height: 90vh;
  padding: 1.5em;
`

// const { Header, Content } = Layout;
class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [
        {
          name: 'USER1',
          color: '#C7E5FF'
        },
        {
          name: 'USER2',
          color: '#E5B29F'
        },
        {
          name: 'USER3',
          color: '#B4E8BC'
        },
        {
          name: 'USER4',
          color: '#AD99B5'
        }
      ],
      searchDisplay: 'none',
      profileDisplay: 'none',
      visible: false,
      currentUser: 0,
      handleSearch: this.handleSearch,
      handleKeyUp: this.handleKeyUp,
      handleProfile: this.handleProfile,
      changeProfile: this.changeProfile,
      showDrawer: this.showDrawer,
    }
  }

  changeProfile = (index) => {
    this.setState({ currentUser: index })
    this.handleProfile()
  }

  handleProfile = () => {
    const { profileDisplay } = this.state
    if (profileDisplay === 'none') {
      this.setState({ profileDisplay: 'block' })
    } else {
      this.setState({ profileDisplay: 'none' })
    }
  }

  handleSearch = (e) => {
    const { searchDisplay } = this.state
    if (searchDisplay === 'none' && e) {
      this.setState({ searchDisplay: 'block' })
    } else {
      this.setState({ searchDisplay: 'none' })
    }
  }

  handleKeyUp = (e) => {
    const { searchDisplay } = this.state
    //  click ESC button event
    if (e.keyCode === 27 && searchDisplay !== 'none') {
      this.handleSearch(1)
    }
  }

  showDrawer = () => {
    const { visible } = this.state
    this.setState({
      visible: !visible,
    })
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyUp, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyUp, false);
  }

  componentDidUpdate = () => {
    // console.log(1)
  }

  render() {
    const {
      handleSearch,
      showDrawer,
      visible
    } = this.state

    return (
      <Store.Provider value={this.state}>
        <Wrapper>
          <Header>
            <Badge count={5} style={{ backgroundColor: 'red', boxShadow: 'red' }}>
              <Icon type="menu-unfold" style={{ fontSize: 24, color: 'white' }} onClick={showDrawer} />
              <Drawer
                placement="left"
                closable={false}
                onClose={showDrawer}
                visible={visible}
              >
                <SideMenu />
              </Drawer>
            </Badge>
            <Profile />
            <h1>NETFLIX</h1>
            <div className="header-right">
              <Icon type="search" style={{ fontSize: 24, color: 'white', fontWeight: 'bold', marginRight: '2em' }} onClick={() => { handleSearch(1) }} />
              <Icon type="ellipsis" style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }} />
            </div>
            <Modal />
          </Header>
          <Content>
            <ItemList />
          </Content>
        </Wrapper>
      </Store.Provider>
    );
  }
}

export default Main;

Main.proptypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }),
  currentUser: PropTypes.number,
  searchDisplay: PropTypes.string,
  profileDisplay: PropTypes.string,
  visible: PropTypes.boolean,
  handleSearch: PropTypes.func,
  handleKeyUp: PropTypes.func,
  handleProfile: PropTypes.func,
  showDrawer: PropTypes.func,
}