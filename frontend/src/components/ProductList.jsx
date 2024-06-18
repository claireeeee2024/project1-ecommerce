import React, { useState, useEffect } from "react";
import { useGetProductsQuery } from "../slices/productSlice";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import { Container, Row, Col } from 'react-bootstrap';
import { Dropdown, DropdownButton } from 'react-bootstrap';


export const ProductList = () => {
    const [sortOption, setSortOption] = useState(localStorage.getItem('sortOption') || undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;
    const { data, isLoading, error } = useGetProductsQuery({
      page: currentPage,
      limit: pageSize,
      sort: sortOption,
    }, { refetchOnMountOrArgChange: true
    }
    );

    useEffect(() => {
        localStorage.setItem('sortOption', sortOption);
      }, [sortOption]);

    
    const sortProducts = (products) => {
        switch (sortOption) {
          case 'lastAdded':
            return [...products];
          case 'priceLowToHigh':
            return [...products].sort((a, b) => a.price - b.price);
          case 'priceHighToLow':
            return [...products].sort((a, b) => b.price - a.price);
          default:
            return products;
        }
    };
    
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    return (
      <Container>
        <h2>Products : </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
          <Row className="justify-content-end mb-3">
                <Col xs={12} md={4}>
                    <DropdownButton
                    id="sort-dropdown"
                    title={`Sort By: ${sortOption.replace(/([a-z])([A-Z])/g, '$1 $2')}`}
                    variant="secondary"
                    >
                    <Dropdown.Item onClick={() => setSortOption('lastAdded')}>
                        Last Added
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOption('priceLowToHigh')}>
                        Price: Low to High
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortOption('priceHighToLow')}>
                        Price: High to Low
                    </Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                  {sortProducts(data?.products).map((product) => (
                    <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                      <Product product={product} />
                    </Col>
                  ))}
            </Row>
            <Row className="justify-content-center justify-content-md-end mt-4">
              <Col xs={12} md={6}>
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