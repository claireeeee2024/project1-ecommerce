import React, { useState, useEffect } from "react";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setSortOption } from "../slices/productSlice";
import Loader from "../components/Loader";

export const ProductList = () => {
  const sortOption =
    useSelector((state) => state.product.sortOption) || "lastAdded";
  const currentPage = useSelector((state) => state.product.page) || 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo) || null;
  const searchKeyword =
    useSelector((state) => state.product.searchKeyword) || "";

  const pageSize = 10;
  const { data, isLoading, error } = useGetProductsQuery(
    {
      page: currentPage,
      limit: pageSize,
      sort: sortOption,
      keywords: searchKeyword,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    setPage(page);
  };

  const handleSortChange = (sort) => {
    dispatch(setSortOption(sort));
    setSortOption(sort);
  };
  return (
    <Container>
      <h2>Products : </h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <Row className="d-flex justify-content-end mb-3">
            <Col xs={12} md={3} className="mb-2 mb-md-0 mx-1">
              <DropdownButton
                id="sort-dropdown"
                title={`Sort By: ${sortOption.replace(
                  /([a-z])([A-Z])/g,
                  "$1 $2"
                )}`}
                variant="secondary"
              >
                <Dropdown.Item onClick={() => handleSortChange("lastAdded")}>
                  Last Added
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSortChange("priceLowToHigh")}
                >
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSortChange("priceHighToLow")}
                >
                  Price: High to Low
                </Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col xs={12} md={3} className="mx-1">
              {userInfo && userInfo.isVendor === true ? (
                <Button
                  variant="primary"
                  onClick={() => navigate("/products/add")} //navigate to add product page
                >
                  Add Product
                </Button>
              ) : null}
            </Col>
          </Row>
          <Row className="d-flex justify-content-between flex-wrap">
            
            {data?.products.length === 0 ? (
              <h2>No products found</h2>
            ) : (
              data?.products.map((product) => (
                <Col
                  key={product._id}
                  xs={12}
                  sm={8}
                  md={6}
                  lg={4}
                  xl={3}
                  className="mb-2 product-card"
                  style={{ minWidth: '220px', flexGrow: 1, flexBasis: '220px' }} //remove to restore original layout
                >
                  
                  <Product product={product} />
                </Col>
              ))
            )}
          </Row>
          <Row className="justify-content-center justify-content-md-end mt-4">
            <Col xs={12} md={2}>
              <Pagination
                currentPage={currentPage}
                totalPages={data?.pages}
                onPageChange={handlePageChange}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
