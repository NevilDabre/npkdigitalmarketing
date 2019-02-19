import PropTypes from 'prop-types';
import React, { Component } from 'react';

const divStyle = {
  'marginTop': '10px'
};

export default class ContactForm extends Component {
  state = {
    fullName: '',
    formSubmitted: false
  };

  handleCancel = this.handleCancel.bind(this);
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  static sender = 'sender@example.com';

  handleCancel() {
    this.setState({
      fullName: ''
    });
  }

  handleChange(event) {
    this.setState({
      fullName: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      REACT_APP_EMAILJS_RECEIVER: receiverEmail,
      REACT_APP_EMAILJS_TEMPLATEID: template
    } = this.props.env;

    this.sendFeedback(
      template,
      this.sender,
      receiverEmail,
      this.state.feedback
    );

    this.setState({
      formSubmitted: true
    });

    this.handleReset();

  }

  sendFeedback(templateId, senderEmail, receiverEmail, feedback) {
    window.emailjs
      .send('mailgun', templateId, {
        senderEmail,
        receiverEmail,
        feedback
      })
      .then(res => {
        this.setState({
          formEmailSent: true
        });
      })
      // Handle errors here however you like
      .catch(err => console.error('Failed to send feedback. Error: ', err));
  }

  render() {
    return (
      <form className="block mbr-form" id="contactForm" onSubmit={this.handleSubmit}>
        <div className="row">
        <div className="col-6 multi-horizontal">
        <input name="fullName" type="text" 
            placeholder="Your Name" className="form-control input" onChange={this.handleChange} value={this.state.fullName}  />
        </div>
        <div className="col-6 multi-horizontal">
        <input name="phone" className="form-control input" type="number" placeholder="Phone Number" onChange={this.handleChange} value={this.state.phone} />
        </div>
        </div>
        <div className="row">
        <div className="col-12">
        <input name="email" className="form-control input" type="email" placeholder="Email Address" onChange={this.handleChange} value={this.state.email} />
        </div>
          </div>
        <div className="row">
          <div className="col-12">
            <textarea name="message" className="form-control" rows="3" onChange={this.handleChange} value={this.state.message}></textarea>
          </div>
        </div>
        <div className="col-12 input-group-btn" style={divStyle}>
          <button type="submit" className="mt-10 btn-primary d-inline-flex text-uppercase align-items-center">Send Message</button>
        </div>
        <div className="alert"></div>
      </form>
    );
  }
}

ContactForm.propTypes = {
  env: PropTypes.object.isRequired
};