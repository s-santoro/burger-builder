import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// connect enzyme
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {

  let wrapper;
  // setup function
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render 2 <NavigationItem/> elements when not authenticated', () => {
    //const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render 3 <NavigationItem/> elements when authenticated', () => {
    //const wrapper = shallow(<NavigationItems isAuthenticated={true}/>);
    wrapper.setProps({
      isAuthenticated: true
    });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render 1 logout <NavigationItem/> element when authenticated', () => {
    //const wrapper = shallow(<NavigationItems isAuthenticated={true}/>);
    wrapper.setProps({
      isAuthenticated: true
    });
    expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>))
      .toEqual(true);
  });
});