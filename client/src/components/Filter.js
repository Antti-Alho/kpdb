import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { Input, InputGroup, Icon } from 'rsuite';
import './Filter.css'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (value) => {
    dispatch(setFilter(value))
  }

  return (
    <InputGroup>
      <Input className='filter' label='search filter' onChange={handleChange} />
      <InputGroup.Button>
        <Icon icon="search" />
      </InputGroup.Button>
    </InputGroup>
  )
}

export default Filter