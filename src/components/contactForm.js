import PropTypes from 'prop-types';
import React, { Component } from 'react';
require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });

const divStyle = {
  marginTop: '10px'
};

export default class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
      env: process.env
    }
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["name"]){
       formIsValid = false;
       errors["name"] = "Cannot be empty";
    }

    //Message
    if(!fields["message"]){
          formIsValid = false;
          errors["message"] = "Cannot be empty";
       }

    //Phone
    if(!fields["phone"]){
      formIsValid = false;
      errors["phone"] = "Cannot be empty";
   }

    //Email
    if(!fields["email"]){
       formIsValid = false;
       errors["email"] = "Cannot be empty";
    }

    if(typeof fields["email"] !== "undefined"){
       let lastAtPos = fields["email"].lastIndexOf('@');
       let lastDotPos = fields["email"].lastIndexOf('.');

       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
   }  

   this.setState({errors: errors});
   return formIsValid;
}

  handleCancel = this.handleCancel.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  handleChange = this.handleChange.bind(this);


  handleCancel() {
    this.setState({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  }

  handleChange(field, event){         
    let fields = this.state.fields;
    fields[field] = event.target.value;        
    this.setState({fields});
}

  handleSubmit(event) {
        event.preventDefault();
       const {
          REACT_APP_EMAILJS_INQUIRY_TEMPLATEID: webInquiryTemplateId,
          REACT_APP_EMAILJS_REPLY_TEMPLATEID: webInquiryReplyTemplateId,
          REACT_APP_EMAILJS_SERVICEID: serviceId,
          REACT_APP_EMAILJS_USERID: userId
        } = this.props.env;
        
        if(this.handleValidation()){
          let fields = this.state.fields
      
          this.sendContactRequest(
            webInquiryTemplateId,
            webInquiryReplyTemplateId,
            serviceId,
            userId,
            fields['name'],
            fields['phone'],
            fields['email'],
            fields['message']
          );
      
          this.setState({
            formSubmitted: true
          });

        }
  }

  sendContactRequest( webInquiryTemplateId, webInquiryReplyTemplateId, serviceId, userId, name, phone, email, message) {

    /**
     *  1. Send Email to Webmaster
     *  2. Send Email to Inquirer  
     * */ 

    window.emailjs
      .send(serviceId, 	webInquiryTemplateId, {
        name, phone, email, message
      }, userId)
      .then(res => {
        return window.emailjs
          .send(serviceId, webInquiryReplyTemplateId,{
            name, email
          }, userId)
      })
      .then(res=>{
        this.setState({
          formEmailSent: true
        });
      })
      .catch(err => console.error('Failed to send feedback. Error: ', err));
  }

  render() {
    return (
      <form className="block mbr-form" id="contactForm" onSubmit={this.handleSubmit}>
        <div className="row">
        <div className="col-6 multi-horizontal">
        <input name="name" type="text" placeholder="Your Name" className="form-control input" onChange={this.handleChange.bind(this, "name")} value={this.state.name}  />
            <span style={{color: "red"}}>{this.state.errors["name"]}</span>
        </div>
        <div className="col-6 multi-horizontal">
        <input name="phone" className="form-control input" type="number" placeholder="Phone Number" onChange={this.handleChange.bind(this, "phone")} value={this.state.phone} />
        <span style={{color: "red"}}>{this.state.errors["phone"]}</span>
        </div>
        </div>
        <div className="row">
        <div className="col-12">
        <input name="email" className="form-control input" type="email" placeholder="Email Address" onChange={this.handleChange.bind(this, "email")} value={this.state.email} />
        <span style={{color: "red"}}>{this.state.errors["email"]}</span>
        </div>
          </div>
        <div className="row">
          <div className="col-12">
            <textarea name="message" className="form-control" rows="3" value={this.state.message} onChange={this.handleChange.bind(this, "message")}></textarea>
            <span style={{color: "red"}}>{this.state.errors["message"]}</span>
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