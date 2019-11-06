import React from 'react';
import { shallow } from 'enzyme';
import { OrderForm, mapDispatchToProps } from './OrderForm'; 
import { setOrders } from '../../actions';
import { getOrders } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('Orders container', () => {
  let wrapper
  // const mockOrders = [
  //   {
  //     id: 1,
  //     name: 'Chris',
  //     ingredients: ['steak', 'queso']
  //   },
  //   {
  //     id: 2,
  //     name: 'Not Chris',
  //     ingredients: ['chicken', 'siracha']
  //   }
  // ]
  const mockSetOrders = jest.fn();
  getOrders.mockImplementation(() => {
    return Promise.resolve({
      orders: mockOrders
    });
  });
  beforeEach(() => {
    wrapper = shallow(
      <OrderForm
        setOrders={mockSetOrders}
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });


});