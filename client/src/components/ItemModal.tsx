import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../flux/actions/itemActions';
import { IItemReduxProps, IItemModal, ITarget } from '../types/interfaces';

const ItemModal = ({ isAuthenticated, addItem,item }: IItemModal) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const handleToggle = () => setModal(!modal);

  const handleChangeName = (e: ITarget) => setName(e.target.value);
  const handleChangeCategory = (e: ITarget) => setCategory(e.target.value);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if(name === "" || category ==="") return alert("the item must have a name and a category")
    const newItem = {
      name,
      category
    };
    // Add item via addItem action
    addItem(newItem);
    // Close modal
    handleToggle();
    setCategory("");
  };

  const {categories} = item;
  return (
    <div>
      {isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage items</h4>
      )}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={handleChangeName}
              />
              <Label for="exampleCustomSelect">Custom Select</Label>
              <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange ={(e)=>handleChangeCategory(e)} value={category}>
              <option value="" disabled>CHOOSE ONE</option>
                {categories.map(aCategory => (
                  <option value={aCategory.name} key = {aCategory._id}>{aCategory.name}</option>
                ))}
                
                
              </CustomInput>
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: IItemReduxProps) => {
  
  return {
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, { addItem })(ItemModal);
