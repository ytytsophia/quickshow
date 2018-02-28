import React, { Component } from 'react';
import {
  Select
} from 'antd';
import PropTypes from 'prop-types';
const { Option } = Select;

class SYSelect extends Component {
  createOptions = (options) => {
    let optionsItem = options && options.map((item,index) => <Option key={index} disabled={item.disabled} value={item.value}>{item.label}</Option>);
    return optionsItem;
  }
  
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({value});
    }
  }

  render() {
    const { options,...otherProps} =  this.props;
    return (
      <Select
        {...otherProps}
      >
        {this.createOptions(options)}
      </Select>
    );
  }
}

SYSelect.propTypes = {
  options: PropTypes.array,
  className: PropTypes.string,
}
export default SYSelect;
