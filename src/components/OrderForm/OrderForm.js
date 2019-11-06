import React, { Component } from 'react';
import { submitOrder } from '../../apiCalls';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setOrders } from '../../actions';
import { getOrders } from '../../apiCalls';

export class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      formComplete: false
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.checkForm();
  }

  handleIngredientChange = async e => {
    e.preventDefault();
    await this.setState({ ingredients: [...this.state.ingredients, e.target.name] });
    this.checkForm();
  }

  checkForm() {
    if (this.state.name !== '' && this.state.ingredients.length !== 0) {
      this.setState({ formComplete: true });
    } else {
      this.setState({ formComplete: false });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.formComplete === true) {
      this.clearInputs();
      await submitOrder(this.state.name, this.state.ingredients)
      getOrders()
        .then(data => this.props.setOrders(data.orders))
        .catch(err => console.error('Error fetching:', err));
    }  
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });
    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        {this.state.formComplete && <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>}

        {!this.state.formComplete && <button disabled={true}>
          Submit Order
        </button>}
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setOrders,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(OrderForm);