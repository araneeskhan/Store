import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift({
        ...action.payload,
        id: Date.now(),
        date: new Date().toISOString(),
        status: 'processing'
      });
    },
    updateOrderStatus: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    }
  }
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer; 