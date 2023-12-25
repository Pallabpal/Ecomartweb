import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactPage = () => {
    const handleSubmit=(e)=>{
       e.preventDefault();
    }
  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <h2>Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you! Use the
            form below to get in touch with us.
          </p>

          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Our Location</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt tellus ut sem bibendum, vitae euismod mi euismod.
          </p>
          <p>123 Main Street, Cityville, India</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;