import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './components/contactForm';

class App extends Component {
  render() {
    return (
        <ContactForm env={this.props.env} />
    );
  }
}

App.propTypes = {
  env: PropTypes.object.isRequired
};

export default App;