CREATE DATABASE maduvha;

DROP TABLE IF EXISTS tests;

DROP TABLE IF EXISTS products;


DROP TABLE IF EXISTS departments;

CREATE TABLE products (
    product_id INT GENERATED ALWAYS AS IDENTITY,
    group_id INT NOT NULL REFERENCES product_group(group_id),
    product_name VARCHAR(250) NOT NULL,
    specification VARCHAR(250) NOT NULL,
    PRIMARY KEY(product_id)
);

CREATE TABLE departments (
    department_id INT GENERATED ALWAYS AS IDENTITY,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(department_id)
);


CREATE TABLE tests(
    test_id INT GENERATED ALWAYS AS IDENTITY,
    department_id INT REFERENCES departments(department_id),
    product_id INT REFERENCES products(product_id),
    requestor VARCHAR(50),
    test_types TEXT NOT NULL,
    test_description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(test_id)
);

CREATE TABLE test_types (
    test_type_id INT GENERATED ALWAYS AS IDENTITY,
    test_name VARCHAR(50) NOT NULL,
    PRIMARY KEY(test_type_id)
);

CREATE TABLE facility (
    facility_id INT GENERATED ALWAYS AS IDENTITY,
    group_id INT REFERENCES product_group(group_id),
    facility_name VARCHAR(100) NOT NULL,
    test_types text[], 
    header text[],
    additional text,
    safety text[][],
    PRIMARY KEY(facility_id)
);

CREATE TABLE product_group (
    group_id INT GENERATED ALWAYS AS IDENTITY,
    ground VARCHAR(255),
    PRIMARY KEY(group_id)
);






