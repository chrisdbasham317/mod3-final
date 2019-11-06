export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const submitOrder = (name, ingredients) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      ingredients
    })
  }
  return fetch('http://localhost:3001/api/v1/orders', options)
    .then(res => {
      if (!res.ok) {
        throw Error('Unable to place error')
      }
      return res.json();
    })
}