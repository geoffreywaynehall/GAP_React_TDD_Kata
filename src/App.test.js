import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

test('renders the game board', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('#game-board').exists()).toBeTruthy();
});
