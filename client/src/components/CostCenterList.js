import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import ConfirmModal from './ConfirmModal'
import EditModal from './EditModal'
import Filter from './Filter'
import { Table, IconButton, Icon, Placeholder, Panel, Button, Form, FormGroup } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

const CostCenterList = () => {
  const costCenters = useSelector(state => state.costCenters)
  const filter = useSelector(state => state.filter)
  const [confirmVisible, setConfirmVisible] = useState(false)
  const [idToDelete, setIdToDelete] = useState('')
  const [editVisible, setEditVisible] = useState('')
  const [ccToEdit, setCcToEdit] = useState({})

  const handleDelete = async ( id ) => {
    setIdToDelete(id)
    setConfirmVisible(true)
  }

  const handleEdit = ( id ) => {
    setCcToEdit(costCenters.find( cc => cc.id === id))
    setEditVisible(true)
  }

  if (costCenters.length > 0) {
    return (
      <div>
        <Panel>
          <Form layout='inline'>
            <FormGroup>
              <Filter/>
            </FormGroup>
            <Link to="/form">
              <Button className='right'>
                <Icon icon="plus-square-o" /> New cost center
              </Button>
            </Link>
          </Form>
          <Table
            autoHeight
            data={costCenters.filter( cc => {
              return Object.values(cc).find( value => 
                value.includes(filter)
              )
            })}
          >
            <Column width={70} align="center" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={100}>
              <HeaderCell>Budget</HeaderCell>
              <Cell dataKey="budget" />
            </Column>

            <Column width={100}>
              <HeaderCell>Actual</HeaderCell>
              <Cell dataKey="actual" />
            </Column>

            <Column width={150}>
              <HeaderCell>Company Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={150}>
              <HeaderCell>Person In Charge</HeaderCell>
              <Cell dataKey="personInCharge" />
            </Column>

            <Column width={200}>
              <HeaderCell>Creation</HeaderCell>
              <Cell dataKey="creationDate" />
            </Column>

            <Column width={200}>
              <HeaderCell>Change</HeaderCell>
              <Cell dataKey="changeDate" />
            </Column>

            <Column width={80} fixed="right">
              <HeaderCell>Action</HeaderCell>

              <Cell>
                {rowData => {
                  return (
                    <span>
                      <IconButton onClick={() => handleEdit(rowData.id)} icon={<Icon icon="edit2" />} circle size="xs" />
                      <IconButton onClick={() => handleDelete(rowData.id)} icon={<Icon icon="warning" />} circle size="xs" />
                    </span>
                  );
                }}
                
              </Cell>
            </Column>
          </Table>
          <ConfirmModal
            visible={confirmVisible}
            setVisible={setConfirmVisible}
            id={idToDelete}
          />
          <EditModal
            visible={editVisible}
            setVisible={setEditVisible}
            ccToEdit={ccToEdit}
          />
        </Panel>
      </div>
    )
  } else {
    return (
      <div>
        <Placeholder.Grid rows={10} columns={7} active />
      </div>
    )
  }
}
export default CostCenterList