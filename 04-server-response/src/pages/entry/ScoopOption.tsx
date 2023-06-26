import React from 'react';
import Col from 'react-bootstrap/Col';

interface IScoopOption {
  name: string;
  imagePath: string;
}

function ScoopOption({ name, imagePath }: IScoopOption) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
    </Col>
  );
}

export default ScoopOption;
