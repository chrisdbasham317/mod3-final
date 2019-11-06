import { setOrders } from './index';

describe('actions', () => {
  it('should have a type of SET_ORDERS', () => {
    const orders = [{ id: 2, name: 'chris', ingredients: ['steak'] }];
    const expectedAction = {
      type: 'SET_ORDERS',
      orders: orders
    };

    const result = setOrders(orders);
    
    expect(result).toEqual(expectedAction);

  })
})