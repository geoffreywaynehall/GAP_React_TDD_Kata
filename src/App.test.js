import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

test('displays the title of the app', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.title').exists()).toBe(true);
    expect(wrapper.find('.title').text()).toBe("Tic-Tac-Toe");
});

test('renders the game board component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('GameBoard').exists()).toBe(true);
});
