import React, { useReducer, useEffect } from 'react';

// Mock product data
const products = [
  { id: 1, name: 'Laptop', price: 999, stock: 5 },
  { id: 2, name: 'Headphones', price: 149, stock: 10 },
  { id: 3, name: 'Mouse', price: 29, stock: 20 },
];

// Reducer logic
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        // Increase quantity if item exists (within stock limit)
        const updatedItems = state.items.map(i =>
          i.id === action.payload.id && i.quantity < i.stock
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        return { ...state, items: updatedItems };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.stock) } : item
      );
      return { ...state, items: updatedItems };
    }

    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload, couponError: '' };

    case 'SET_COUPON_ERROR':
      return { ...state, couponError: action.payload };

    default:
      return state;
  }
};

// Calculate cart totals
const calculateTotals = (items, coupon) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon === 'DISCOUNT10' ? subtotal * 0.1 : 0;
  return { subtotal, discount, total: subtotal - discount };
};

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    coupon: '',
    couponError: '',
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Handle coupon validation
  const applyCoupon = () => {
    const validCoupons = ['DISCOUNT10'];
    if (validCoupons.includes(state.coupon)) {
      dispatch({ type: 'APPLY_COUPON', payload: state.coupon });
    } else {
      dispatch({ type: 'SET_COUPON_ERROR', payload: 'Invalid coupon code' });
    }
  };

  const { subtotal, discount, total } = calculateTotals(state.items, state.coupon);

  return (
    <div className="shopping-cart">
      {/* Product Listing */}
      <div className="product-list">
        <h2>Products</h2>
        {products.map(product => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>${product.price} | Stock: {product.stock}</p>
            <button
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h2>Cart ({state.items.length})</h2>
        
        {state.items.map(item => (
          <div key={item.id} className="cart-item">
            <div>
              <h4>{item.name}</h4>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: item.id, quantity: +e.target.value },
                  })
                }
                min="1"
                max={item.stock}
              />
              <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
                Remove
              </button>
            </div>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        {/* Coupon Section */}
        <div className="coupon-section">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={state.coupon}
            onChange={(e) => dispatch({ type: 'APPLY_COUPON', payload: e.target.value })}
          />
          <button onClick={applyCoupon}>Apply</button>
          {state.couponError && <p className="error">{state.couponError}</p>}
        </div>

        {/* Totals */}
        <div className="totals">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Discount: ${discount.toFixed(2)}</p>
          <p><strong>Total: ${total.toFixed(2)}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;