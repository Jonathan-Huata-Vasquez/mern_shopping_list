import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, getCategories } from '../flux/actions/itemActions';

import { IItemReduxProps, IShoppingList } from '../types/interfaces';

const ShoppingList = ({
  getItems,
  getCategories,
  item,
  isAuthenticated,
  deleteItem
}: IShoppingList) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line 
  }, []);

  const handleDelete = (id: string) => {
    deleteItem(id);
  };


  const { items, categories } = item;
  return (
    <Container>
      {categories.map(aCategory =>
      (
        <ListGroup key={aCategory._id}>
          <h2>{aCategory.name}</h2>
          <TransitionGroup className="shopping-list">
          
            {items.map(item => (
               item.category.name=== aCategory.name && (
                <CSSTransition key={item._id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    {isAuthenticated ? (
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        &times;
                      </Button>
                    ) : null}
                    {item.name}
                  </ListGroupItem>
              </CSSTransition>
              )
              
            ))}
          </TransitionGroup>
        </ListGroup>
      ))}

    </Container>
  );
};

const mapStateToProps = (state: IItemReduxProps) => {
  return {
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, { getItems, deleteItem, getCategories })(ShoppingList);
