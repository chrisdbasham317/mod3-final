import React from 'react';
import { shallow } from 'enzyme';
import { OrderForm, mapDispatchToProps } from './OrderForm'; 
import { setOrders } from '../../actions';
import { getOrders } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('Orders container', () => {
  let wrapper
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

  describe('mapDispatchToProps', () => {
    it('should call setOrders action when handleSubmit is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setOrders({name: 'chris', ingredients: ['cheese', 'steak']});
      mapDispatchToProps(mockDispatch);
      wrapper.setState({ name: 'chris', ingredients: ['cheese', 'steak'], formComplete: true });
      wrapper.instance().handleSubmit();

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });

});