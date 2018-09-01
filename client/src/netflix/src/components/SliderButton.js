import React from 'react';
import { Icon } from 'antd';

const commonStyle = {
  display: 'flex',
  background: 'black',
  width: '3%',
  height: '100%',
  zIndex: 2,
  justifyContent: 'center',
  alignItems: 'center',
}

function PrevArrow(props) {
  const { className, onClick } = props
  return (
    <Icon className={className}
      type="left"
      style={{
        ...commonStyle,
        marginLeft: '5px'
      }}
      onClick={onClick}
    />
  )
}

function NextArrow(props) {
  const { className, onClick } = props
  return (
    <Icon className={className}
      type="right"
      style={{
        ...commonStyle,
        marginRight: '5px'
      }}
      onClick={onClick}
    />
  )
}

export {
  PrevArrow,
  NextArrow,
}