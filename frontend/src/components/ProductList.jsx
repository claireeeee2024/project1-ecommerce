import React, { useState, useEffect } from "react";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import { Container, Row, Col } from 'react-bootstrap';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setSortOption } from "../slices/productSlice";
import Loader from "../components/Loader";


export const ProductList = () => {
    const [sortOption, setSortOption] = useState(localStorage.getItem('sortOption') || "lastAdded"); //change to redux later
    const [currentPage, setCurrentPage] = useState(localStorage.getItem('page') || 1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.auth.userInfo) || null;

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

      useEffect(() => {
        localStorage.setItem('page', currentPage);
      }, [currentPage]);
    
  
    const handlePageChange = (page) => {
        dispatch(setPage(page));
      setCurrentPage(page);
    };

    // const handleSortChange = (sort) => {
    //     dispatch(setSortOption(sort));
    //     setSortOption(sort);
    // }
  
    return (
      <Container>
        <h2>Products : </h2>
        {isLoading ? (
            <Loader />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
          <Row className="d-flex justify-content-end mb-3" >
                <Col xs={12} md={4} >
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
                <Col xs={12} md={2} >
                    {userInfo && userInfo.isVendor === true ? (
                        <Button
                        variant="primary"
                        onClick={() => navigate("/products/add")} //navigate to add product page
                        >
                        Add Product
                        </Button>
                    ) : null
                    }
                </Col>
            </Row>
            <Row>
                  {data?.products.map((product) => (
                    <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
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

  