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

  it('should update state when user types in a name', () => {
    const mockEvent = {
      target: {
        name: 'name',
        value: 'Chris'
      }
    }
    wrapper.find('input').simulate('change', mockEvent);
    expect(wrapper.state().name).toEqual('Chris');
  });

  it('should update state when an ingredient is selected', () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        name: 'steak'
      }
    };
    const expected = ['steak']
    wrapper.find('button').at(5).simulate('click', mockEvent);
    expect(wrapper.state().ingredients).toEqual(expected);
  })

  it.only('should register if the form is complete or not', () => {
    expect(wrapper.state().formComplete).toEqual(false);
    wrapper.setState({ name: 'Chris' });
    wrapper.instance().checkForm();
    expect(wrapper.state().formComplete).toEqual(false);
    wrapper.setState({ ingredients: ['steak'] });
    wrapper.instance().checkForm();
    expect(wrapper.state().formComplete).toEqual(true);
  })

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