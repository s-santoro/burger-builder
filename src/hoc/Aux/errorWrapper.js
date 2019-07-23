import React, { Component } from "react";

import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const errorWrapper = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    // create axios interceptor
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        err => {
          this.setState({ error: err });
        }
      );
    }

    // Function is needed to remove dead interceptors which are bloating memory
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);      
    }

    // remove Modal
    errorConfirmed = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} closeModal={this.errorConfirmed}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default errorWrapper;
