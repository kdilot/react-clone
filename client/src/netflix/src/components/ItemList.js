import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col, Card } from 'antd';
import Slider from "react-slick";
import { PrevArrow, NextArrow } from './SliderButton';
import Store from 'context/store'

const Wrapper = styled.div`
  h2 {
    color: white;
  }

  .slick-slider:hover .slick-arrow {
    opacity: 0.6
  }

  .slick-slider .slick-arrow, .slick-next.slick-disabled:before, .slick-prev.slick-disabled:before {
    opacity: 0
  }

  .anticon.anticon-left.slick-arrow.slick-prev.slick-disabled,  .anticon.anticon-right.slick-arrow.slick-next.slick-disabled {
    opacity: 0;
    visibility: hidden
  }

  .anticon-left:before, .anticon-right:before {
    font-size: 30px
  }

  p {
    padding: 2px
  }

  margin-bottom: 1em;
`

class ItemList extends Component {
  state = {
    display: 'none',
    data: '',
  }

  View = (store) => {
    const settings = {
      dots: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    }
    let table = []
    store.menuMovielist.map(list => (
      table.push(
        <div key={list.name}>
          <Wrapper>
            <h2>{list.name}</h2>
            <Slider {...settings}>
              {list.data.map((_list, index) => {
                return (
                  <Row gutter={5} key={index}>
                    {_list.map(children => {
                      return (
                        <Col span={3} key={children.id}>
                          <Card style={{ width: '100%' }} onClick={() => { store.handleMovieModal(children) }}>
                            <p><img alt="img" style={{ width: '100%' }} src={store.imgSize.medium + children.poster_path} /></p>
                          </Card>
                        </Col>
                      )
                    }
                    )}
                  </Row>
                )
              }
              )}
            </Slider>
          </Wrapper>
        </div >
      )
    ))

    return table
  }
  render() {
    const { View } = this

    return (
      <Store.Consumer>
        {store => {
          return (
            View(store)
          )
        }}
      </Store.Consumer>
    )
  }
}
export default ItemList;