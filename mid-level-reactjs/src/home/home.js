import React, { Component } from 'react';
import exampleData from './categories.json';

export default class Home extends Component {
    state = {
        totalCategory: '',
        fifthLevelCategories: '',
        totalProduct: '',
        fifthLevelProducts: '',
        mostProducts: {},
        fewestProducts: {}
    }

    componentDidMount() {
        // Total category
        this.setState({ totalCategory: exampleData.length });

        // 5th level category and 5th level products
        const arr = [];
        const fifthLevelProductsArr = [];
        exampleData.forEach(el1 => {
            el1.children?.forEach(el2 => {
                el2.children?.forEach(el3 => {
                    el3.children?.forEach(el4 => {
                        el4.children?.forEach(el5 => {
                            arr.push(el5)
                            fifthLevelProductsArr.push(el5.products)
                        });
                    });
                });
            });
        });
        this.setState({ fifthLevelCategories: arr.length, fifthLevelProducts: fifthLevelProductsArr.reduce((a, b) => a + b, 0) });

        // Total products
        var totalSum = 0;
        exampleData.forEach(el1 => {
            if (el1.products && !isNaN(el1.products)) {
                totalSum = totalSum + el1.products;
            }
            totalSum = this.totalProducts(el1, totalSum)
        });
        this.setState({ totalProduct: totalSum })

        // most and fewest products
        var data = [];
        exampleData.forEach(el1 => {
            let tempObj = {
                name: el1.name,
                products: this.totalProducts(el1, el1.products)
            }
            data.push(tempObj)
        });
        let z = data.sort(this.compare)
        this.setState({ mostProducts: z[z.length - 1], fewestProducts: z[0] })
    }

    compare = (a, b) => {
        if (a.products < b.products) {
            return -1;
        }
        if (a.products > b.products) {
            return 1;
        }
        return 0;
    }

    totalProducts = (ele, total) => {
        if (ele.children && ele.children.length > 0) {
            let totalSum = total;
            ele.children.forEach(innerEle => {
                if (innerEle.products && !isNaN(innerEle.products)) {
                    totalSum = totalSum + innerEle.products;
                }
                totalSum = this.totalProducts(innerEle, totalSum)
            });
            return totalSum
        } else {
            return total
        }
    }

    render() {
        const { totalCategory, fifthLevelCategories, totalProduct, fifthLevelProducts, mostProducts, fewestProducts } = this.state;
        return (
            <>
                <h3>Total Categories: {totalCategory}</h3>
                <h3>5th Level Categories: {fifthLevelCategories}</h3>
                <h3>Total Products: {totalProduct}</h3>
                <h3>5th Level Total Products: {fifthLevelProducts}</h3>
                <h3>Most Products: {`${mostProducts.name} = ${mostProducts.products}`}</h3>
                <h3>Fewest Products: {`${fewestProducts.name} = ${fewestProducts.products}`}</h3>
            </>
        );
    }
}