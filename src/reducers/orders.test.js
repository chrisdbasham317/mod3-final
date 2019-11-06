import { orders } from '../reducers/orders';

describe('orders reducer', () => {
  it('should return the initial state', () => {
    const expected = [];
    const result = orders(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return state with a new order', () => {
    const mockOrder = [{ id: 3, name: 'chris', ingredients: ['steak'] }];
    const mockAction = {
      type: 'SET_ORDERS',
      orders: mockOrder
    }
    const expected = mockOrder;
    const result = orders([], mockAction);
    expect(result).toEqual(expected);
  });
});