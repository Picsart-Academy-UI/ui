import { createSlice } from '@reduxjs/toolkit';

export const testSlice = createSlice({
  name: 'test',
  initialState: {
    value: 0,
    data: {}
  },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 },
    setData: (state, action) => {
      state.data = action.payload
    }
  },
});

// export action creators
export const { increment, decrement, setData } = testSlice.actions;

// for asynchronously fetch data to the store using redux thunk
export const fetchTodo = (id) => async dispatch => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`); //example: fetch todo
  const data = await response.json();
  dispatch(setData(data))
};

// export reducer
export default testSlice.reducer;
