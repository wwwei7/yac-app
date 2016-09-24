import React from 'react';
import Layout from '../common/Layout';
import style from './style.less';
import 'antd/dist/antd.css';


class solutionListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Layout current="solutionList" open="solutionManagement">
        <h1> Solution Management </h1>
      </Layout>
    );
  }
}

export default solutionListPage;