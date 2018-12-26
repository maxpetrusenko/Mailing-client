import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';


class App extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      subject: '',
      message: '',
      file: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  async handleSubmit(e) {
    e.preventDefault()

    const {email, subject, message, file} = this.state
    const form  = await axios.post('/api/form', {
      email,
      subject,
      message,
      file
    })
  }

  render() {
    return (
      <Form style= {{padding: '10px'}} onSubmit = {this.handleSubmit}>
      <FormGroup>
        <Label for="Email">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="type your email here" onChange = {this.handleChange} />
      </FormGroup>

      <FormGroup>
        <Label for="exampleSubject">Subject</Label>
        <Input type="text" name="subject" id="exampleSubject" placeholder="subject required" onChange = {this.handleChange} />
      </FormGroup>
 
      <FormGroup>
        <Label for="emessage">Message:</Label>
        <Input type="textarea" name="message" id="examplemessage" onChange = {this.handleChange} />
      </FormGroup>

      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" onChange = {this.handleChange}/>
      </FormGroup>

      <Button >Submit</Button>
    </Form>
    );
  }
}

export default App;
