import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GameBoard from '../Components/gameBoard';

configure({ adapter: new Adapter() });

describe('on start', () => {
    test('displays a blank 3x3 table', () => {
        const wrapper = shallow(<GameBoard />);
        const table = wrapper.find('table');
        const cells = table.find('td');
        expect(table.exists()).toBe(true);
        expect(cells).toHaveLength(9);
        cells.forEach((cell, index) => {
            expect(cell.text()).toBe("");
        })
    });

    test('displays whose turn it is to go first', () => {
        const wrapper = shallow(<GameBoard />);
        expect(wrapper.find('.turn-tracker').exists()).toBe(true);
        expect(wrapper.find('.turn-tracker').text()).toBe("It is X's turn to go!");
    });
});

describe('during gameplay', () => {
    test('the first player to click a square will cause an "X" to appear on that square', () => {
        const wrapper = shallow(<GameBoard />);
        wrapper.find('#square-0').simulate('click');
        expect(wrapper.find('#square-0').text()).toBe('X');
    });
});