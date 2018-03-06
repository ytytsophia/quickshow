import React, {Component} from 'react';
import { Select,Spin } from 'antd';
import PropTypes from 'prop-types';
const Option = Select.Option;

let timeout;
let currentValue;

function fetch(value,fetchService, searchName, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  currentValue = value;
  let sendData = {};
  sendData[searchName] = value;

  function fetchData() {
    fetchService(sendData).then((d) => {
      if (currentValue === value) {
        const result = d;
        const data = [];

        result && result.forEach((r) => {
          data.push({
            value: r.id,
            text: r.name,
          });
        });
        
        callback(data);
      }
    });
  }

  timeout = setTimeout(fetchData, 300);
}

class SearchInput extends Component {
  state = {
    data: [],
    value: '',
  }
  handleChange = (value) => {
    const {onChange, fetchService, searchName} = this.props;
    this.setState({ value });
    if(value !== ''){
      this.setState({
        fetching: true
      });
      fetch(value, fetchService, searchName, data => this.setState({ data, fetching:false }));
    }
    if(onChange) {
      onChange(value);
    }
  }
  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    const {value,fetching} = this.state;
    const {
      style,
      placeholder
    } = this.props;
    return (
      <Select
        mode="combobox"
        value={value}
        style={style}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        placeholder={placeholder}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
      >
        {options}
      </Select>
    );
  }
}
SearchInput.propTypes = {
  placeholder: PropTypes.string,
  searchName: PropTypes.string,
  fetchService: PropTypes.func,
  style: PropTypes.object,
};
export default SearchInput;