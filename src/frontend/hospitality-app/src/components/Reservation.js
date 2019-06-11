import React from 'react';
import {Layout} from '../Layout.js';
import {Link} from  'react-router-dom';

import { 
  Segment,
  Form,
  Step,
  Icon,
  Divider,
  Button
} from 'semantic-ui-react';

export class Reservation extends React.Component {
  constructor(props){
    super(props);
    console.log(props)
    let data = props.location.state;
    if (data === undefined) data = null
    this.state = { 
      firstName: data === null ? '' : data.data.firstName,
      lastName: data === null ? '' : data.data.lastName,
      tel: data === null ? '' : data.data.tel,
      email: data === null ? '' : data.data.email
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    this.props.history.push(
      '/register-face', 
      { 
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      tel: this.state.tel,
      email: this.state.email
    })
  }

  render() {
    const {
       firstName,
       lastName,
       email,
       tel
      } = this.state

    return (
      <Layout>
        <Segment 
          stacked
        // style = {{backgroundColor: 'transparent'}}
        >
          <StepsBar/>
          <Divider/>
          <ReservationForm 
          handle = {this.handleChange.bind(this)} 
          submit = {this.handleSubmit.bind(this)}
          firstName = {firstName} 
          lastName = {lastName}
          tel = {tel}
          email = {email} 
          />
        </Segment>

        {/* TODO: delete when backend is completed */}
        {/* <strong>onChange:</strong>
        <pre>{JSON.stringify({ firstName, email }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedName, submittedEmail }, null, 2)}</pre> */}

      </Layout>
    )
  }
}

const ReservationForm = props => (
  <Form onSubmit = {props.submit} >
    <Form.Group widths='equal'>
      <Form.Input 
      label='First name'
      placeholder='John' 
      name='firstName' 
      value={props.firstName} 
      onChange={props.handle} 
      required
      />

      <Form.Input
        label='Last name'
        placeholder='Doe'
        name='lastName'
        value={props.lastName}
        onChange={props.handle}
        required
      />
    </Form.Group>

    <Form.Group widths='equal'>
      <Form.Input 
      label='E-mail'
      placeholder='JohnDoe@hr.nl' 
      name='email' 
      value={props.email} 
      onChange={props.handle}
      required
      />

      <Form.Input
        label='Phone number'
        placeholder='06xxxxxxxxxx'
        name='tel'
        value={props.tel}
        onChange={props.handle}
        required
      />
    </Form.Group>

    <div 
      style = {{
        marginTop: '2em',
        // justifyContent:'center', 
        // display:'flex' 
      }}>
      <Button.Group>
        <Link to ='/lobby'>
          <Button animated color='red'>
            <Button.Content visible>Cancel</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow left' />
            </Button.Content>
          </Button>
        </Link>
        <Button.Or />
        <Button animated primary>
            <Button.Content visible>Submit</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
      </Button.Group>
    </div>
  </Form>
)

const StepsBar = () => (
  <div style = {{margin: '0 0 2em 0'}}>
    <Step.Group stackable='tablet'>
      <Step active>
        <Icon name='address card' />
        <Step.Content>
          <Step.Title>Personal Information</Step.Title>
          <Step.Description>Enter personal information</Step.Description>
        </Step.Content>
      </Step>

      <Step disabled>
        <Icon name='camera' />
        <Step.Content>
          <Step.Title>Scan your face</Step.Title>
          <Step.Description>Scan your face for keyless entry</Step.Description>
        </Step.Content>
      </Step>

      <Step disabled>
        <Icon name='info circle' />
        <Step.Content>
          <Step.Title>Confirm Registration</Step.Title>
          <Step.Description>Verify Registration details</Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  </div>
)