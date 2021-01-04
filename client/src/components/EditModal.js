import React, { useState, useEffect } from 'react'
import { updateOne } from '../reducers/costCenterReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Modal, Form, Schema, } from 'rsuite';
import TextField from './TextField'
import NumberField from './NumberField'

const { StringType } = Schema.Types;

const EditModal = ({ visible, setVisible, ccToEdit }) => {

  useEffect(() => {
    setValue(ccToEdit)
  }, [ccToEdit])

  useEffect(()=> {
    setError({})
  }, [setVisible])
  
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
  let form
  const [value, setValue] = useState({
    id: '',
    name: '',
    personInCharge: '',
    budget: '',
    actual: ''
  })
  const [error, setError] = useState({})

  const dispatch = useDispatch()
  const handleSubmit = () => {
    try {
      if (!form.check()) {
        console.error('Form Error');
        return;
      }
      dispatch(updateOne( value.id, value))
      dispatch(setNotification(`Cost Center changed`, 'success', 5))
      setVisible(false)
    } catch (error) {
      dispatch(setNotification(`something went wrong :-(`, 'error', 5))
    }
  }

  if (!visible) return (null)
  return (
    <div className="modal-container">
      <Modal backdrop="static" show={visible} size="xs">
        <Modal.Body>
          <Modal.Header>
            <Modal.Title>Edit {value.id}</Modal.Title>
          </Modal.Header>
          <Form
            ref={ref => (form = ref)}
            onChange={(formData) => {
              setValue(formData)
            }}
            onError={(formError) => {
              setError(formError)
            }}
            formValue={value}
            formError={error}
            model={model}
          >
            <TextField name="id" label="Id" disabled/>
            <TextField name="name" label="Name" />
            <TextField name="personInCharge" label="Person In Charge" />
            <TextField accepter={NumberField} name="actual" label="Actual" />
            <TextField accepter={NumberField} name="budget" label="Budget" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' onClick={() => {
              setError({})
              handleSubmit()
            }} appearance="primary">
            Save
          </Button>
          <Button onClick={() => {
              setError({})
              setVisible(false)
            }} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditModal
