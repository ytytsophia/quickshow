import React, { Component } from 'react';
import {
  Select
} from 'antd';
import PropTypes from 'prop-types';
const { Option, OptGroup } = Select;

class SmartSelect extends Component {
  createOption(item,index){
    return (
      <Option 
        key={index} 
        disabled={item.disabled} 
        value={item.value}
      >
        {item.label}
      </Option>
    );
  }
  createAllOptions = (options) => {
    let optionsItem = options && options.map((item,index) => {
      const {children} = item;
      if(children && children.length){
        return (
          <OptGroup label={item.label} key={index}>
            {children.map((child,i) => this.createOption(child,i))}
          </OptGroup>
        );
      }else{
        return this.createOption(item,index);
      }
    });
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
        {this.createAllOptions(options)}
      </Select>
    );
  }
}

SmartSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    children: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string,PropTypes.number])
    }))
  })),
  className: PropTypes.string,
};
export default SmartSelect;
