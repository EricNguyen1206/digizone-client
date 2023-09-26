import Link from "next/link";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";

import { useAppSelector } from "@/helper/hooks";

const OrderCancel = () => {
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user.data || !user.data?.email) {
      router.push("/");
    }
  }, [router, user.data]);

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <div className="jumbotron text-center">
          <h1 className="display-3 text-danger">Opps! Cancelled !</h1>
          <p className="lead">
            <strong>Payment failed !</strong> Your order got cancelled. Please
            try again.
          </p>
          <hr />
          <p className="lead">
            <Link href="/products">
              <a className="btn btn-secondary btn-sm" role="button">
                Shop More
              </a>
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default OrderCancel;
