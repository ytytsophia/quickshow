import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row,Col } from 'antd';

class Grid extends Component {
  constructor(props) {
    super(props);
  }
  createCols = (data) => {
    return data.map((item, i) => {
      return (
        <Col {...item.col} key={i}>
          {item.element}
        </Col>
      )
    });
  }
  render(){
    const {row,data} = this.props;
    const cols = this.createCols(data);
    return (
      <Row {...row}>
        {cols}
      </Row>
    );
  }
}
Grid.propTypes = {
  row: PropTypes.shape({
    align: PropTypes.string,
    gutter: PropTypes.oneOfType([PropTypes.number,PropTypes.object]),
    justify: PropTypes.string,
    type: PropTypes.string
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    col: PropTypes.object,
    element: PropTypes.oneOfType([PropTypes.element,PropTypes.string])
  }))
};
export default Grid;