import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h2>About Us</h2>
          <p>
            Welcome to our website! We are a dedicated team of professionals
            passionate about creating amazing things.
          </p>

          <p>
            Our mission is to provide high-quality products/services and ensure
            customer satisfaction. We value innovation, teamwork, and
            excellence in everything we do.
          </p>
        </Col>
        <Col md={4}>
          <h2>Our Team</h2>
          <ul>
            <li>Pallab Pal - Lead Developer</li>
            {/* Add more team members as needed */}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;