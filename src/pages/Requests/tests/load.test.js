import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Loads from '../Loads/index';
import mockstore from '../../../__mocks__/index';
import { Box } from '@material-ui/core';

const get = () =>
  mount(
    <Provider store={mockstore}>
      <Loads />
    </Provider>
  );

const find = (cmp, attr) => cmp.at(0).find(attr);

describe('Requests/Loads: ', () => {
  let cmp;
  beforeEach(() => {
    cmp = get();
  });

  test('should render properly', () => {
    expect(find(cmp, Box).length).toBeGreaterThanOrEqual(1);
  });
});
