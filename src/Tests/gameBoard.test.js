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
});