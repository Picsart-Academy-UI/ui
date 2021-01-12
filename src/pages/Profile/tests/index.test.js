import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Profile from '../index';
import mockstore from '../../../__mocks__/index';

const get = () =>
  mount(
    <Provider store={mockstore}>
      <Profile />
    </Provider>
  );

const find = (cmp, attr) => cmp.find(`[test="${attr}"]`);

describe('Profile: ', () => {
  let cmp;
  beforeEach(() => {
    cmp = get();
  });

  test('should render properly', () => {
    expect(find(cmp, 'card-wrapper').length).toBeGreaterThan(1);
  });

  test('should have an avatar', () => {
    expect(find(cmp, 'avatar').length).toBeGreaterThan(1);
  });

  test('should have a name surname typography', () => {
    expect(find(cmp, 'tf-name').length).toBeGreaterThan(1);
  });

  test('should have a name surname typography', () => {
    expect(find(cmp, 'tf-surname').length).toBeGreaterThan(1);
  });

  test('should have an email typography', () => {
    expect(find(cmp, 'tf-email').length).toBeGreaterThan(1);
  });

  test('should have an dropdown to select team', () => {
    expect(find(cmp, 'form-cntrl-team').length).toBeGreaterThan(1);
  });

  test('should have a position input field', () => {
    expect(find(cmp, 'tf-pos').length).toBeGreaterThan(1);
  });

  test('should have a submit button', () => {
    expect(find(cmp, 'smb-btn').length).toBeGreaterThan(1);
  });

  // test('should have a cancel button when editing', () => {
  //   expect(find(cmp, 'cncl-btn').prop('')).toEqual(1);
  // })
});
