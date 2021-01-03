import { shallow } from 'enzyme';

import Profile from '../index';

const get = (props = {}) => shallow(<Profile {...props} />);

const find = (cmp, attr) => cmp.find(`[test="${attr}"]`);

describe('Profile: ', () => {
  let cmp;

  beforeEach(() => {
    cmp = get();
  });

  test('should render properly', () => {
    expect(find(cmp, 'card-wrapper').length).toEqual(1);
  });

  test('should have an avatar', () => {
    expect(find(cmp, 'avatar').length).toEqual(1);
  });

  test('should have an avatar src prop', () => {
    expect(find(cmp, 'avatar').prop('src')).toBeTruthy();
  });

  test('should have a name surname typography', () => {
    expect(find(cmp, 'typog-name-surname').length).toEqual(1);
  });

  test('should have a name surname typography', () => {
    expect(find(cmp, 'typog-name-surname').length).toEqual(1);
  });

  test('should have an email typography', () => {
    expect(find(cmp, 'typog-email').length).toEqual(1);
  });

  test('should have an dropdown to select team', () => {
    expect(find(cmp, 'form-cntrl-team').length).toEqual(1);
  });

  test('should have a position tyopgraphy', () => {
    expect(find(cmp, 'typog-pos').length).toEqual(1);
  });

  test('should have a position input field', () => {
    expect(find(cmp, 'tf-pos').length).toEqual(1);
  });

  test('should have a submit button', () => {
    expect(find(cmp, 'smb-btn').length).toEqual(1);
  });
});
