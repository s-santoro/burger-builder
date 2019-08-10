import React, {Component} from 'react';

// function which returns a lazy loaded component
// importComponent is a reference to an import() function which loads the wanted module
// from the module the default component is extracted with cmp.default
const lazyComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComponent()
        .then(cmp => {
          return this.setState({component: cmp.default});
        })
    }

    render() {
      const Comp = this.state.component;
      return Comp ? <Comp {...this.props} /> : null;
    }
  }

};

export default lazyComponent;