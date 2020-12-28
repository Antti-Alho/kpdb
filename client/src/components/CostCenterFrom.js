import React, { useState } from 'react'
import { createOne } from '../reducers/costCenterReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import NumberField from './NumberField'
import TextField from './TextField'
import { Button, ButtonToolbar, Form, Schema } from 'rsuite';
import { useHistory } from "react-router-dom"

const { StringType } = Schema.Types;

const model = Schema.Model({
  id: StringType().isRequired('This field is required.'),
  name: StringType().isRequired('This field is required.'),
  personInCharge: StringType().isRequired('This field is required.'),
});

const CostCenterFrom = ( props ) => {
  const [value, setValue] = useState({
    id: '',
    name: '',
    personInCharge: '',
    budget: 0,
    actual: 0
  })
  const [error, setError] = useState({})
  const history = useHistory()
  
  const dispatch = useDispatch()
  const handleSubmit = () => {
    console.log(value)
    try {
      dispatch(createOne(value))
      dispatch(setNotification(`Cost Center Created`, 'success', 5))
      history.push('/');
    } catch (error) {
      console.log(error)
      dispatch(setNotification(`something went wrong :-(`, 'error', 5))
    }
  }

  return (
    <div>
      <h2>New cost center</h2>
      <Form
        onChange={ (formData) => {
          setValue(formData)
        }}
        onError={ (formError) => {
          setError(formError)
        }}
        formValue={value}
        formError={error}
        model={model}
      >
        <TextField name="id" label="Id" />
        <TextField name="name" label="Name" />
        <TextField name="personInCharge" label="Person In Charge" />
        <TextField accepter={NumberField} name="actual" label="Actual"/>
        <TextField accepter={NumberField} name="budget" label="Budget"/>

        <ButtonToolbar>
          <Button appearance="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </ButtonToolbar>
      </Form>
    </div>
  )
}

export default CostCenterFrom
