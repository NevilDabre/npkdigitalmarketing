import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, email, renderField, phoneNumber,submit } from './app.lib';
import '../App.css';

const ContactForm = props => {
  const { handleSubmit } = props
  return (
  <form className="block mbr-form" id="contactForm" onSubmit={handleSubmit(submit)}>
        <div className="row">
        <div className="col-6 multi-horizontal">
        <Field name="fullName" 
            component={renderField} 
            type="text" 
            placeholder="Your Name" 
            validate={required} />
        </div>
        <div className="col-6 multi-horizontal">
        <Field name="phone"
            type="number"
            component={renderField}
            placeholder="Phone Number"
            validate={[required,phoneNumber]} />
        </div>
        </div>
        <div className="row">
        <div className="col-12">
        <Field name="email"
            component={renderField}
            type="email"
            placeholder="Email Address"
            validate={[required, email]} />
        </div>
          </div>
        <div className="row">
          <div className="col-12">
            <textarea className="form-control" rows="3"></textarea>
          </div>
        </div>
        <div className="col-12 input-group-btn">
          <button type="submit" className="mt-10 btn-primary d-inline-flex text-uppercase align-items-center">Send Message</button>
        </div>
        <div className="alert"></div>
</form>
  );
};

export default reduxForm({
  form: 'contactForm', // a unique identifier for this form
})(ContactForm);