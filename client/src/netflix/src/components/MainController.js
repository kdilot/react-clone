import React, { Component } from 'react';
import { Modal, SideMenu, ItemList, Profile, MovieInformation } from 'components';
import Store from 'context/store';
import { Badge, Icon, Drawer } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { genres, movieList, allMovieList, IMG_large, IMG_medium, IMG_small } from 'common/movie';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  overflow-x: hidden;
  background-color: black;
  color: white;
`
const Header = styled.div`
  width: 100vw;
  height: 10vh;
  padding: 1.5em;
  display: flex;
  align-items: center;

  h1 {
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
  width: 100vw;
  height: 90vh;
  padding: 1.5em;
`

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
      imgSize: {
        large: IMG_large,
        medium: IMG_medium,
        small: IMG_small,
      },
      searchList: [],
      movieData: {},
      searchDisplay: 'none',
      profileDisplay: 'none',
      movieDisplay: 'none',
      visible: false,
      currentUser: 0,
      genreList: movieList,
      list: allMovieList,
      genres: genres,
      handleSearch: this.handleSearch,
      handleSearchList: this.handleSearchList,
      handleKeyUp: this.handleKeyUp,
      handleMovieModal: this.handleMovieModal,
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

  handleSearchList = (e) => {
    const { list } = this.state
    if(e.target.value) {
      const searchList = list.filter(data =>
        data.title.toLowerCase().indexOf(e.target.value) !== -1
      )
      this.setState({ searchList })
    }
  }

  handleMovieModal = (data) => {
    const { movieDisplay } = this.state
    if (movieDisplay === 'none') {
      this.setState({ movieDisplay: 'block' })
    } else {
      this.setState({ movieDisplay: 'none' })
    }
    if (data) this.setState({ movieData: data })
  }

  handleKeyUp = (e) => {
    const { searchDisplay, movieDisplay } = this.state
    //  click ESC button event
    if (e.keyCode === 27) {
      if(movieDisplay !== 'none') {
        this.handleMovieModal(false)
      } else if(searchDisplay !== 'none') {
        this.handleSearch(1)
      } 
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
          <MovieInformation />
          <Header>
            <Badge count={Object.keys(this.state.list).length} style={{ backgroundColor: 'red', boxShadow: 'red' }} overflowCount={999}>
              <Icon type="menu-unfold" style={{ fontSize: 24, color: 'white' }} onClick={showDrawer} />
              <Drawer
                width="300px"
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
  imgSize: PropTypes.shape({
    large: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
  }),
  searchList: PropTypes.array,
  movieData: PropTypes.object,
  searchDisplay: PropTypes.string,
  profileDisplay: PropTypes.string,
  movieDisplay: PropTypes.string,
  visible: PropTypes.boolean,
  currentUser: PropTypes.number,
  genreList: PropTypes.array,
  list: PropTypes.array,
  genres: PropTypes.array,
  handleSearchList: PropTypes.func,
  handleSearch: PropTypes.func,
  handleKeyUp: PropTypes.func,
  handleMovieModal: PropTypes.func,
  handleProfile: PropTypes.func,
  showDrawer: PropTypes.func,
}