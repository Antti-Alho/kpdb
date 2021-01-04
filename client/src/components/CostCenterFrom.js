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
  id: StringType()
    .isRequired('This field is required.')
    .minLength(6, 'ID must be 6 characters long')
    .maxLength(6, 'ID must be 6 characters long'),
  name: StringType()
    .isRequired('This field is required.')
    .minLength(1, 'name must be 1 characters long')
    .maxLength(30, 'name must be 30 characters long'),
  personInCharge: StringType()
    .isRequired('This field is required.')
    .minLength(1, 'person in charge must be 1 characters long')
    .maxLength(30, 'person in charge must be 30 characters long'),
});

const CostCenterFrom = ( props ) => {
  let form
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
    if (!form.check()) {
      console.error('Form Error');
      return;
    }
    try {
      dispatch(createOne(value))
      dispatch(setNotification(`Cost Center Created`, 'success', 5))
      history.push('/');
    } catch (error) {
      dispatch(setNotification(`something went wrong :-(`, 'error', 5))
    }
  }
  

  return (
    <div>
      <h2>New cost center</h2>
      <Form
        ref={ref => (form = ref)}
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
          <Button 
            appearance="primary" 
            type='submit' 
            onClick={() => {
              setError({})
              handleSubmit()
            }}>
            Submit
          </Button>
        </ButtonToolbar>
      </Form>
    </div>
  )
}

export default CostCenterFrom
