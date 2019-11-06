import React from 'react';
import { shallow } from 'enzyme';
import { Orders, mapStateToProps, mapDispatchToProps } from './Orders'; 
import { setOrders } from '../../actions';
import { getOrders } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('Orders container', () => {
  let wrapper
  const mockOrders = [
    {
      id: 1,
      name: 'Chris',
      ingredients: ['steak', 'queso']
    },
    {
      id: 2,
      name: 'Not Chris',
      ingredients: ['chicken', 'siracha']
    }
  ]
  const mockSetOrders = jest.fn();
  getOrders.mockImplementation(() => {
    return Promise.resolve({
      orders: mockOrders
    });
  });
  beforeEach(() => {
    wrapper = shallow(
      <Orders
        orders={mockOrders}
        setOrders={mockSetOrders}
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should get orders after mounting', () => {
    expect(getOrders).toHaveBeenCalled();
  });

  describe('mapStateToProps', () => {
    it('should return an object with the orders array', () => {
      const mockState = { orders: mockOrders };
      const expected = { orders: mockOrders };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call setOrders action when componentDidMount is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setOrders(mockOrders);
      mapDispatchToProps(mockDispatch);
      
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });
});