import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

import Image from 'next/image';

function ButtonEliminarTarjeta() {
  return (
    <div>
      
      <div>
        <Form>
        {[ 'radio'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            
            <div>
            <img src="/TarjetaVisa.png" alt="TarjetaVisa" width="200" height="200" />
            <Form.Check
              inline
              label=""
              name="group1"
              type={type}
              id={`inline-${type}-4`}
            />
            </div>
            
            <div>
            <Image src="/TarjetaVisa.png" alt="TarjetaVisa" width="200" height="200" />
            <Form.Check
              inline
              label=""
              name="group1"
              type={type}
              id={`inline-${type}-4`}
            />
            </div>

            <div>
            <Image src="/Mastercard.jpeg" alt="Mastercard" width="200" height="200" />
            <Form.Check
              inline
              label=""
              name="group1"
              type={type}
              id={`inline-${type}-4`}
            />
            </div>

            <div>
            <img src="/AmericanExpress.jpeg" alt="AmericanExpress" width="200" height="200" />
            <Form.Check
              inline
              label=""
              name="group1"
              type={type}
              id={`inline-${type}-4`}
            />
            </div>

            <div>
            <img src="/DinersClub.png" alt="DinersClub" width="200" height="200" />
            <Form.Check
              inline
              label=""
              name="group1"
              type={type}
              id={`inline-${type}-4`}
            />
            </div>

            <div>
            <img src="/Maestro.jpeg" alt="Maestro" width="200" height="200" />
            <Form.Check
              inline
              label=""
              name="group1"
              type={type}
              id={`inline-${type}-4`}
            />
            </div>

            <div>
            <img src="/BCP.jpeg" alt="BCP" width="200" height="200" />
            <Form.Check
              inline
              label=""
              name="group1"
              type={type}
              id={`inline-${type}-4`}
            />
            </div>

            
          </div>
        ))}
        </Form>
      
      
      
      </div>

      <div>
        <Button className="mb-2" variant="primary" size="lg">
          ELIMINAR TARJETA
      </Button>{' '}
      </div>
      
    </div>
  );
}

export default ButtonEliminarTarjeta;