import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { FormatPrice } from '../../util/format';
import api from '../../services/api';

import { ProductList } from './styles';

function Home(props) {
  const [products, setProducts] = useState([]);

  function handleAddProduct(product) {
    const { dispatch } = props;

    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  }

  useEffect(() => {
    api.get('/products').then((response) => {
      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: FormatPrice(product.price),
      }));
      setProducts(data);
    });
  }, []);

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart /> 2
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

export default connect()(Home);
