import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import axios from "axios";
import queryString from "query-string";

import ProductItem from "@/components/Products/ProductItem";
import ProductFilter from "@/components/Products/ProductFilter";
import BreadcrumbDisplay from "@/components/shared/BreadcrumbDisplay";
import PaginationDisplay from "@/components/shared/PaginationDisplay";
import { useAppSelector } from "@/helper/hooks";

import styles from "@/styles/Product.module.css";

interface Props {
  products: Record<string, any>[];
  metadata: Record<string, any>;
}

const AllProducts: NextPage<Props> = ({ products, metadata }) => {
  const [userType, setUserType] = useState("customer");
  const router = useRouter();

  const user = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user.data?.email) {
      setUserType(user.data.type);
    }
  }, [user.data?.email]);

  return (
    <>
      <Row>
        <Col md={8}>
          <BreadcrumbDisplay
            childrens={[
              {
                active: false,
                href: "/",
                text: "Home",
              },
              {
                active: true,
                href: "",
                text: "Products",
              },
            ]}
          />
        </Col>
        <Col md={4}>
          <DropdownButton
            variant="outline-secondary"
            title="Sort By"
            id="input-group-dropdown-2"
            className={styles.dropdownBtn}
            onSelect={(e) => {
              if (e) {
                router.query.sort = e;
                router.push(router);
              } else {
                delete router.query.sort;
                router.push(router);
              }
            }}
          >
            <Dropdown.Item href="#" eventKey="-avgRating">
              Rating
            </Dropdown.Item>
            <Dropdown.Item href="#" eventKey="-createdAt">
              Latest
            </Dropdown.Item>
          </DropdownButton>
          {userType === "admin" && (
            <Link href="/admin/update-product">
              <a className="btn btn-primary btnAddProduct">
                <PlusCircle className="btnAddProductIcon" />
                Add Product
              </a>
            </Link>
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <ProductFilter />
        </Col>
        <Col sm={10}>
          <Row xs={1} md={3} className="g-3">
            {products && products.length > 0 ? (
              products.map((product: Record<string, any>) => (
                <ProductItem
                  key={product._id as string}
                  userType={userType}
                  product={product}
                />
              ))
            ) : (
              <h1>No Products</h1>
            )}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <PaginationDisplay metadata={metadata} />
        </Col>
      </Row>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
): Promise<any> => {
  try {
    // get products with axios
    const url = queryString.stringifyUrl({
      url: "http://localhost:3100/api/v1/products",
      query: context.query,
    });
    const { data } = await axios.get(url);
    return {
      props: {
        products: data?.result?.products || ([] as Record<string, any>[]),
        metadata: data?.result?.metadata || {},
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default AllProducts;
