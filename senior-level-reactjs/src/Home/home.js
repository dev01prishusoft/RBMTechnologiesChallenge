import React, { Component } from 'react';
import exampleData from './categories.json';
import './home.css';

var resultData = [];
var tempData = [];

export default class Home extends Component {
    state = {
        data: [],
        childrenCountData: [],
        searchValue: '',
        getCountValue: ''
    }

    componentDidMount() {
        // Retrieve the name and product attributes for:
        // a) a specified category or subcategory
        // b) its immediate children
        exampleData.forEach(element => {
            tempData.push(this.totalProducts(element))
        });
        this.setState({ data: tempData })

        // category or subcategory retrieve the count for the total number of children and their descendants
        exampleData.forEach(el1 => {
            let tempObj = {
                name: el1.name,
                childrenCount: this.totalChildrens(el1)
            }
            resultData.push(tempObj)
        });
        this.setState({ childrenCountData: resultData })
    }

    totalProducts = (ele) => {
        if (ele.children && ele.children.length > 0) {
            ele.children.forEach(innerEle => {
                tempData.push(this.totalProducts(innerEle))
            });
            return ele
        } else {
            return ele
        }
    }

    totalChildrens = (ele) => {
        if (ele.children && ele.children.length > 0) {
            ele.children.forEach(innerEle => {
                let tempObj = {
                    name: innerEle.name,
                    childrenCount: innerEle.children?.length
                }
                resultData.push(tempObj)
                this.totalChildrens(innerEle)
            });
            return ele.children?.length
        } else {
            return ele.children?.length
        }
    }

    render() {
        const { data, childrenCountData, searchValue, getCountValue } = this.state;
        return (
            <div style={{ height: '100%', padding: '0 20px' }}>
                <h3>Name and Product Attributes</h3>
                <input type="text" placeholder="Enter category or subcategory" value={searchValue ? searchValue : ''} className="modifiedInput" onChange={(e) => this.setState({ searchValue: e.target.value })} />
                <div style={{ height: '40%', overflowY: 'scroll' }}>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Product</th>
                        </tr>
                        {data.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))?.map((d, i) => (
                            <tr key={i}>
                                <td>{d.name}</td>
                                <td>{d.products}</td>
                            </tr>
                        ))}

                    </table>
                </div>
                <h3>Category or Subcategory retrieve the count for the total number of children and their descendants</h3>
                <input type="text" placeholder="Enter category or subcategory" value={getCountValue ? getCountValue : ''} className="modifiedInput" onChange={(e) => this.setState({ getCountValue: e.target.value })} />
                <div style={{ height: '40%', overflowY: 'scroll' }}>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>ChildrenCount</th>
                        </tr>
                        {childrenCountData.filter((item) => item.name.toLowerCase().includes(getCountValue.toLowerCase()))?.map((d, i) => (
                            <tr key={i}>
                                <td>{d.name}</td>
                                <td>{d.childrenCount}</td>
                            </tr>
                        ))}

                    </table>
                </div>
            </div>
        );
    }
}