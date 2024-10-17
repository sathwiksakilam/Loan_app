import React from 'react';
import Card from 'react-bootstrap/Card';
import { ReactComponent as CardIcon } from '../Icons/Card.svg'; // Ensure the path is correct


function BasicExample({name,Value}) {
  return (
    <Card className="card-content1" style={{border:"2px solid black"}}>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ backgroundColor: '#0A512F', padding: '20px', textAlign: 'center', flexBasis: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardIcon style={{ width: '50px', height: '50px', color: 'white' }} />
        </div>
        <Card.Body style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Card.Title>{Value || 2000}</Card.Title>
          <Card.Title>{name}</Card.Title>
        </Card.Body>
      </div>
    </Card>
  );
}

export default BasicExample;
