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
  
  const model = Schema.Model({
    id: StringType().isRequired('This field is required.'),
    name: StringType().isRequired('This field is required.'),
    personInCharge: StringType().isRequired('This field is required.'),
  });

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
            <TextField name="id" label="Id" />
            <TextField name="name" label="Name" />
            <TextField name="personInCharge" label="Person In Charge" />
            <TextField accepter={NumberField} name="actual" label="Actual" />
            <TextField accepter={NumberField} name="budget" label="Budget" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleSubmit()} appearance="primary">
            Save
          </Button>
          <Button onClick={() => setVisible(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditModal
