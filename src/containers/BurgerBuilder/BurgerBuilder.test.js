import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// connect enzyme
configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {

  let wrapper;
  // setup function
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder initIngredient={() => {}}/>);
  });

  it('should render 1 salad <BuildControls/> element when authenticated', () => {
    wrapper.setProps({ingredients: {salad: 0, bacon: 0, cheese: 0, meat: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});