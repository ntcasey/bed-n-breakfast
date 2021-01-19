import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DayOfWeek from '../DayOfWeek.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('test1', () => {

    it('should see first div', () => {
        const wrapper = shallow(<DayOfWeek />);
        console.log(wrapper.html());
        var test= `<div class="day-of-week"><div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div></div>`;
        expect(wrapper.html()).toBe(test);
    })

})

// "jest": {
//     "setupTestFrameworkScriptFile": "<rootDir>__tests__/setup/setupEnzyme.js",
//     "testPathIgnorePatterns": ["<rootDir>/__tests__/setup/"]
//   }