// import { shallow, mount } from 'enzyme';
// import { Provider} from 'react-redux';
// import store from '../../../store'
// import SignIn from '../index';

// const get = (props = {}) => shallow(<SignIn {...props} />);

// const find = (cmp, attr) => cmp.find(`[test="${attr}"]`);

// describe('Profile: ', () => {
//   let cmp;

//   beforeEach(() => {
//     cmp = get().dive();
//     console.log(cmp.debug())
//   });

//   test('should empty', () => {
//       expect(1).toBe(1);
//   })

//   test('should render properly', () => {
//     expect(find(cmp, 'div-wrapper').length).toEqual(1);
//   });

//   test('should have a way to login with google', () => {
//       const gbtn = find(cmp, 'g-btn')
//       expect(gbtn.length).toEqual(1);
//       expect(gbtn.prop('render').length).toEqual(1);
//   })

// });
