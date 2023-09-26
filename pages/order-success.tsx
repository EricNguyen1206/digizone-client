import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import { CLEAR_CART } from "@/context/cart";
import { useAppDispatch, useAppSelector } from "@/helper/hooks";

const OrderSuccess = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.data?.email) {
      router.push("/");
    }
    dispatch({ type: CLEAR_CART, payload: {} });
  }, [router, user, dispatch]);

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <div className="jumbotron text-center">
          <h1 className="display-3">Thank You!</h1>
          <p className="lead">
            <strong>Please check your order details</strong> for further
            instructions. You will recieve an email with order details.
          </p>
          <hr />
          <p className="lead">
            <Link href={`/orders`}>
              <a className="btn btn-primary btn-sm" role="button">
                View This Order
              </a>
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default OrderSuccess;
