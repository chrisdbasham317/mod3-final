import React from 'react';
import { shallow } from 'enzyme';
import { Orders } from './Orders'; 
import { getOrders } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('Orders', () => {
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

  beforeEach(() => {
    wrapper = shallow(
      <Orders
        orders={mockOrders}
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

})