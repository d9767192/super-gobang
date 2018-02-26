// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import { shallow, render, mount, configure } from 'enzyme';

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.configure = configure;
