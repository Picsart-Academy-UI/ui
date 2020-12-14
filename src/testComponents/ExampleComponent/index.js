import React  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, fetchTodo } from '../../testStore/slices/TestSlice';

function ExampleComponent() {
  const count = useSelector(state => state.test.value);
  const todoData = useSelector(state => state.test.data);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span style={{ margin: '0 10px'}}>{count}</span>
        <button onClick={() => dispatch(increment())}> + </button>
      </div>

      <div>
        <h4>Fetch random todo</h4>
        <button onClick={() => dispatch(fetchTodo(Math.floor(Math.random() * 200) + 1))}>Get Todo</button>
        <div>
          {todoData.title}
        </div>
      </div>
    </div>
  );
}
export default ExampleComponent
