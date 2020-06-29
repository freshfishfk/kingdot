import Button from '../components/Button/index.js';
import ButtonGroup from '../components/ButtonGroup/index.js';
import Dropdown from '../components/Dropdown/index.js';
import DropdownItem from '../components/DropdownItem/index.js';
import DropdownMenu from '../components/DropdownMenu/index.js';
import Message from '../components/Message/index.js';
import Spin from '../components/Spin/index.js';

const components = [
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Message,
    Spin
];

const install = (Vue) => {
    Vue.prototype.$message = Message.install;
    components.forEach(c => {
        Vue.component(c.name, c);
    });
};
export default {
    version: undefined,
    install: install,
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Message,
    Spin
};
