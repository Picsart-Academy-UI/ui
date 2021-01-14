import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import GoogleLogin from 'react-google-login';
import SignIn from '../index';
import mockstore from '../../../__mocks__/index';
import { Button, TableContainer } from '@material-ui/core';

const get = () =>
  mount(
    <Provider store={mockstore}>
      <SignIn />
    </Provider>
  );

const find = (cmp, attr) => cmp.find(attr);

describe('SignIn: ', () => {
  let cmp;
  beforeEach(() => {
    cmp = get();
  });

  test('should render properly', () => {
    expect(find(cmp, `[test="div-wrapper"]`).length).toBeGreaterThanOrEqual(1);
  });

  test('should have a google login component from react-google-login lib', () => {
    expect(find(cmp, GoogleLogin).length).toBeGreaterThanOrEqual(1);
  });
});
