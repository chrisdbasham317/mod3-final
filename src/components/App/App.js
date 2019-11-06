import React from 'react';
import './App.css';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { setOrders } from '../../actions';
// import { getOrders } from '../../apiCalls';
import Orders from '../../containers/Orders/Orders';
import OrderForm from '../OrderForm/OrderForm';

const App = () => {
  // componentDidMount() {
  //   getOrders()
  //     .then(data => this.props.setOrders(data.orders))
  //     .catch(err => console.error('Error fetching:', err));
  // }
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>
        
        <Orders />
      </main>
    );
  }


// export const mapStateToProps = ({ orders }) => ({
//   orders
// });

// export const mapDispatchToProps = dispatch => (
//   bindActionCreators({
//     setOrders,
//   }, dispatch)
// );

// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;

