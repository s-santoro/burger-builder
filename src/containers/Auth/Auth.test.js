import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Auth} from './Auth';
import Spinner from '../../components/UI/Spinner/Spinner';

// connect enzyme
configure({adapter: new Adapter()});

describe('<Auth />', () => {
  let wrapper;
  // setup function
  beforeEach(() => {
    wrapper = shallow(<Auth setAuthRedirectPath={() => {}}/>);
  });

  it('should render 2 input elements', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('should render a spinner when loading', () => {
    wrapper.setProps({loading: true});
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

});