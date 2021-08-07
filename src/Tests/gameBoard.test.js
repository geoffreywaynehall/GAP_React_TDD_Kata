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
        expect(wrapper.find('.turn-tracker').exists()).toBe(true);
        expect(wrapper.find('.turn-tracker').text()).toBe("It is X's turn to go!");
    });

    test('the user can not undo on the first turn', () => {
        expect(wrapper.find('#undo-button').exists()).toBe(false);
    });

    test('the user can not reset on the first turn', () => {
        expect(wrapper.find('#reset-button').exists()).toBe(false);
    });
});

describe('during gameplay', () => {
    test('the first player to click a square will cause an "X" to appear on that square', () => {
        wrapper.find('#square-0').simulate('click');
        expect(wrapper.find('#square-0').text()).toBe('X');
    });

    test('the turn tracker is updated', () => {
        wrapper.find('#square-0').simulate('click');
        expect(wrapper.find('.turn-tracker').text()).toBe("It is O's turn to go!");
    });

    test('the second player to click a different square will cause an "O" to appear on that square', () => {
        wrapper.find('#square-0').simulate('click');
        wrapper.find('#square-1').simulate('click');
        expect(wrapper.find('#square-1').text()).toBe('O');
    });

    test('clicking the same square twice will not count as a turn', () => {
        wrapper.find('#square-0').simulate('click');
        wrapper.find('#square-0').simulate('click');
        expect(wrapper.find('#square-0').text()).toBe('X');
        expect(wrapper.find('.turn-tracker').text()).toBe("It is O's turn to go!");
    });

    test('all the squares can be clicked until they are all filled', () => {
        const turnOrder = [0, 1, 2, 6, 7, 8, 3, 4, 5];
        let turn = 'X';
        turnOrder.forEach((square) => {
            wrapper.find('#square-' + square).simulate('click');
            expect(wrapper.find('#square-' + square).text()).toBe(turn);
            turn = turn === 'X' ? 'O' : 'X';
        })
    });

    test('the game is reset when the user clicks the "Reset" button', () => {
        const turnOrder = [0, 1, 2];
        turnOrder.forEach((square) => {
            wrapper.find('#square-' + square).simulate('click');
        })
        wrapper.find('#reset-button').simulate('click');
        turnOrder.forEach((square) => {
            expect(wrapper.find('#square-' + square).text()).toBe('');
        })
        expect(wrapper.find('.turn-tracker').text()).toBe("It is X's turn to go!");
    });

    test('the game is reset to the previous turn when the user clicks the "Undo" button', () => {
        const turnOrder = [0, 1, 2];
        turnOrder.forEach((square) => {
            wrapper.find('#square-' + square).simulate('click');
        })
        wrapper.find('#undo-button').simulate('click');
        expect(wrapper.find('#square-0').text()).toBe('X');
        expect(wrapper.find('#square-1').text()).toBe('O');
        expect(wrapper.find('#square-2').text()).toBe('');
        expect(wrapper.find('.turn-tracker').text()).toBe("It is X's turn to go!");
    });

    test('the user can undo multiple turns by clicking the "Undo" button more than once', () => {
        const turnOrder = [0, 1, 2];
        turnOrder.forEach((square) => {
            wrapper.find('#square-' + square).simulate('click');
        })
        wrapper.find('#undo-button').simulate('click');
        wrapper.find('#undo-button').simulate('click');
        expect(wrapper.find('#square-0').text()).toBe('X');
        expect(wrapper.find('#square-1').text()).toBe('');
        expect(wrapper.find('.turn-tracker').text()).toBe("It is O's turn to go!");
    });

    test('the user can not undo after clicking the "Reset" button', () => {
        const turnOrder = [0, 1, 2];
        turnOrder.forEach((square) => {
            wrapper.find('#square-' + square).simulate('click');
        })
        wrapper.find('#reset-button').simulate('click');
        expect(wrapper.find('#undo-button').exists()).toBe(false);
    });
});

describe('end of game', () => {
    test('a user wins if they get three in a row vertically', () => {
        const turnOrder = [0, 1, 3, 4, 6];
        turnOrder.forEach((square) => {
            wrapper.find('#square-' + square).simulate('click');
        })
        expect(wrapper.find('.turn-tracker').text()).toBe("X WINS!");
    });

    test('a user wins if they get three in a row horizontally', () => {
        const turnOrder = [0, 3, 6, 4, 8, 5];
        turnOrder.forEach((square) => {
            wrapper.find('#square-' + square).simulate('click');
        })
        expect(wrapper.find('.turn-tracker').text()).toBe("O WINS!");
    });

    test('a user wins if they get three in a row diagonally', () => {
        const turnOrder = [0, 1, 4, 2, 8];
        turnOrder.forEach((square) => {
            wrapper.find('#square-' + square).simulate('click');
        })
        expect(wrapper.find('.turn-tracker').text()).toBe("X WINS!");
    });

    test('if the board is filled without three in a row results in a tie', () => {
        const turnOrder = [0, 1, 2, 6, 7, 8, 3, 4, 5];
        turnOrder.forEach((square) => {
            wrapper.find('#square-' + square).simulate('click');
        })
        expect(wrapper.find('.turn-tracker').text()).toBe("TIE!");
    });

    test('the turn tracker to update until all the spaces are filled', () => {
        const turnOrder = [0, 1, 2, 6, 7, 8, 3, 4];
        let turn = 'X';
        turnOrder.forEach((square) => {
            wrapper.find('#square-' + square).simulate('click');
            turn = turn === 'X' ? 'O' : 'X';
            expect(wrapper.find('.turn-tracker').text()).toBe("It is " + turn + "'s turn to go!");
        })
    });

    test('the turn tracker is reset when resetting after a win', () => {
        const turnOrder = [0, 1, 3, 4, 6];
        turnOrder.forEach((square) => {
            wrapper.find('#square-' + square).simulate('click');
        })
        wrapper.find('#reset-button').simulate('click');
        expect(wrapper.find('.turn-tracker').text()).toBe("It is X's turn to go!");
    });
});