import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GameBoard from '../Components/gameBoard';

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
    wrapper = shallow(<GameBoard />);
});

describe('on start', () => {
    test('displays a blank 3x3 table', () => {
        const table = wrapper.find('table');
        const cells = table.find('td');
        expect(table.exists()).toBe(true);
        expect(cells).toHaveLength(9);
        cells.forEach((cell, index) => {
            expect(cell.text()).toBe("");
        })
    });

    test('displays whose turn it is to go first', () => {
        const turnTracker = wrapper.find('.turn-tracker');
        expect(turnTracker.exists()).toBe(true);
        expect(turnTracker.text()).toBe("It is X's turn to go!");
    });
});

describe('during gameplay', () => {
    test('the first player to click a square will cause an "X" to appear on that square', () => {
        const firstSquare = wrapper.find('#square-0');
        firstSquare.simulate('click');
        expect(firstSquare.text()).toBe('X');
    });

    test('the turn tracker is updated', () => {
        wrapper.find('#square-0').simulate('click');
        expect(wrapper.find('.turn-tracker').text()).toBe("It is O's turn to go!");
    });

    test('the second player to click a different square will cause an "O" to appear on that square', () => {
        wrapper.find('#square-0').simulate('click');
        const secondSquare = wrapper.find('#square-1');
        secondSquare.simulate('click');
        expect(secondSquare.text()).toBe('O');
    });

    test('clicking the same square twice will not count as a turn', () => {
        const firstSquare = wrapper.find('#square-0');
        firstSquare.simulate('click');
        firstSquare.simulate('click');
        expect(firstSquare.text()).toBe('X');
        expect(wrapper.find('.turn-tracker').text()).toBe("It is O's turn to go!");
    });
});