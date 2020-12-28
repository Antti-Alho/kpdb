import React from 'react'
import { Modal, Button, Icon } from 'rsuite'
import { setNotification } from '../reducers/notificationReducer'
import { deleteOne } from '../reducers/costCenterReducer'
import { useDispatch } from 'react-redux'

const ConfirmModal = ({ visible, setVisible, id }) => {

  const dispatch = useDispatch()
  const confirmDelete = async (id) => {
    try {
      dispatch(deleteOne(id))
      dispatch(setNotification(`Cost Center deleted`, 'success', 5))
      setVisible(false)
    } catch (error) {
      dispatch(setNotification(`something went wrong :-(`, 'error', 5))
    }
  }

  if (!visible) return ( null )
  return (
    <div className="modal-container">
      <Modal backdrop="static" show={visible} size="xs">
        <Modal.Body>
          <Icon
            icon="remind"
            style={{
              color: '#ffb300',
              fontSize: 24
            }}
          />
          {'  '}
          {id} entry will be deleted and permanently lost!
          Are you sure?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => confirmDelete(id)} appearance="primary">
            Yes!
          </Button>
          <Button onClick={() => setVisible(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ConfirmModal