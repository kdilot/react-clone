import React, { Component } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import Store from 'context/store';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: black;
  z-index: 2000;
`
const Box = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    color: white;
    margin-bottom: 3em;
  }
  .group {
    display: flex;
  }
`
const ProfileBadge = styled.div`
  margin: 2em;
  margin-bottom: 15em;

  :hover p {
    opacity: 1
  }
  :hover .icon {
    border: 5px solid white;
  }
  .icon {
    font-size: 100px;
  }
  p {
    margin-top: 0.3em;
    padding: 0;
    text-align: center;
    font-size: 1.2em;
    opacity: 0.3;
  }
`

class Profile extends Component {
  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <Wrapper style={{ display: store.profileDisplay }}>
              <Box>
                <h1>Who's watching?</h1>
                <div className="group">
                  {store.user.map((list, index) =>
                    <ProfileBadge key={list.name} onClick={() => { store.changeProfile(index) }}>
                      <Avatar shape="square" size={100} className="icon" icon="user" style={{ backgroundColor: list.color }} />
                      <p>{list.name}</p>
                    </ProfileBadge>
                  )}
                </div>
              </Box>
            </Wrapper>
          )
        }}
      </Store.Consumer>

    );
  }
}

export default Profile;