import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GameBoard from '../Components/gameBoard';

configure({ adapter: new Adapter() });

describe('on start', () => {
    test('displays a blank 3x3 table', () => {
        const wrapper = shallow(<GameBoard />);
        expect(wrapper.find('table').exists()).toBe(true);
    });
});