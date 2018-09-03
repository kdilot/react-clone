import React from 'react';
import styled from 'styled-components';
import { Icon, Row, Col, Rate, Tag } from 'antd';
import Store from 'context/store'
import { CSSTransition } from 'react-transition-group';

const CSS = styled.div`
  .fade-enter {
    opacity: 0.01;
    transform: translateY(100%);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateY(0%);
    -webkit-transition: all 300ms ease-out 0s;
    transition: all 300ms ease-out 0s;
  }
  .fade-exit {
    opacity: 1;
    transform: translateY(0%);
  }
  .fade-exit-active {
    opacity: 0.1;
    transform: translateY(100%);
    -webkit-transition: all 300ms ease-out 0s;
    transition: all 300ms ease-out 0s;
  }
`
const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgba(0,0,0, 0.9);
  z-index: 2000;
  display: flex;
  justify-content: center;
`
const Info = styled.div`
  width: 40vw;
  height: 100vh;
  margin-top: 2.5em;
  overflow: auto;
  background: #242424;
  z-index: 2001;
  display: flex;

  img {
    width: 100%;
  }
  h1, h2 {
    font-size: 2.5em;
    color: white;
    padding: 0;
    margin: 0 40px;
  }
  h2 {
    margin-top: 0.3em;
    font-size: 1.2em;
    font-weight: normal;
  }
`

const MovieInformation = () => {
  return (
    <Store.Consumer>
      {store => {
        return (
          <CSS>
            <CSSTransition
              in={store.movieDisplay === 'block'}
              classNames="fade"
              timeout={300}
              appear
              mountOnEnter
              unmountOnExit
            >
              <Wrapper >
                <Row type="flex" justify="center">
                  <Info>
                    <Row style={{ width: '100vw' }}>
                      <Col span={24} style={{ textAlign: 'right' }}>
                        <img alt="img" src={store.movieData.backdrop_path ? store.imgSize.large + store.movieData.backdrop_path : store.imgSize.medium + store.movieData.poster_path} />
                        <Icon type="close" style={{ fontSize: 25, margin: '0.3em', position: 'absolute', right: 0, top: 0, fontWeight: 'bolder', color: 'black' }} onClick={() => { store.handleMovieModal(false) }} />
                      </Col>
                      <Col span={24}>
                        <h1>{store.movieData ? store.movieData.title : ''}</h1>
                        <h2>
                          {store.movieData.genre_ids && store.movieData.genre_ids.length > 0 ? store.movieData.genre_ids.map(
                            (list, index) => <Tag key={index}>{store.genres[list]}</Tag>
                          ) : ''}
                        </h2>
                        <h2><Rate disabled value={store.movieData.vote_average} count={10} /></h2>
                        <h2><b>Release Information :</b> {store.movieData ? store.movieData.release_date : ''}</h2>
                        <h2>{store.movieData ? store.movieData.overview : ''}</h2>
                      </Col>
                    </Row>
                  </Info>
                </Row>
              </Wrapper>
            </CSSTransition>
          </CSS>
        )
      }}
    </Store.Consumer>
  );
};

export default MovieInformation;