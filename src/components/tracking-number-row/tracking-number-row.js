import React, { useEffect, useState } from 'react';
import styles from './tracking-number-row.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TrackingNumberRow = ({ packageInfo }) => {
  const [shippingState, setShippingState] = useState({});

  useEffect(() => {
    const fetchRowState = async () => {
      const status = await fetch('http://localhost:5001/packtrack-2e8a8/us-central1/widgets/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ code: packageInfo.tracking_code })
      });

      const response = await status.json();

      setShippingState(response);
    };

    fetchRowState();
  }, [packageInfo]);

  const showPackageStatus = shippingPackage => {
    return (
      <Container fluid>
        <Row>
          <Col xs={6}>
            <small className="font-weight-bold text-uppercase">Destination</small>
            {shippingPackage.Activity[0].ActivityLocation.Address.City}&nbsp;
            {shippingPackage.Activity[0].ActivityLocation.Address.StateProvinceCode}&nbsp;
            {shippingPackage.Activity[0].ActivityLocation.Address.CountryCode}
          </Col>
          <Col xs={6}>
            {/* {shippingPackage.Activity[shippingPackage.Activity.length].City}
            {shippingPackage.Activity[shippingPackage.Activity.length].StateProvinceCode}
            {shippingPackage.Activity[shippingPackage.Activity.length].CountryCode} */}
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <div className={styles.tracking_number_row}>
      <Container>
        <Row>
          <Col xs={6}>
            <small className="font-weight-bold text-uppercase">Carrier</small>
            <div>
              <span className="text-uppercase">{packageInfo.carrier}</span>
            </div>
          </Col>
          <Col xs={6}>
            <small className="font-weight-bold text-uppercase">Tracking Code</small>
            <div>
              <span className="text-uppercase">{packageInfo.tracking_code}</span>
            </div>
          </Col>
        </Row>
      </Container>
      {shippingState?.TrackResponse
        ? showPackageStatus(shippingState.TrackResponse.Shipment.Package)
        : 'Loading...'}
    </div>
  );
};

export default TrackingNumberRow;
