import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  DatePicker,
  Input,
  InputNumber,
  Form,
  Button,
  Select
} from 'antd';
import _ from 'lodash';
import classnames from 'classnames';
import SearchInput from './SearchInput';
const {RangePicker} = DatePicker;
const FormItem = Form.Item;

class BaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true
    };
  }

  createFormItemWithLabel(element) {
    const ele = this.createFormItem(element);
    const {placeholder, label} = element;
    const labelText = label ? label : placeholder;
    let item;
    item = element.type === 'hidden' ? ele :
      (
        <div>
          <div className="filter-label">
            <label>{labelText}</label>
          </div>
          {ele}
        </div>
      );
    return <FormItem key={element.id} className={ element.type === 'hidden' ? 'list-filter-hidden-item': ''}> {item} </FormItem>;
  }

  createFormItem = (element) => {
    const {getFieldDecorator} = this.props.form;
    let item;
    let {
      id,
      label,
      type,
      placeholder,
      value,
      defaultValue,
      onChange,
      ...otherProps
    } = element;

    let defaultPlaceholder = this.props.defaultPlaceholder;
    placeholder = placeholder ? placeholder : defaultPlaceholder;

    const commonProps = {
      placeholder
    };
    let fieldDecoratorCfg = {};

    fieldDecoratorCfg.initialValue = defaultValue || value;
    fieldDecoratorCfg.onChange = onChange;

    const mergeProps = _.merge(commonProps,otherProps)
    switch (element.type) {
      case 'hidden':
        item = (
          <Input type='hidden'
            {...otherProps}
          />
        );
        break;
      case 'text':
        item = (
          <Input
            {...mergeProps}
          />
        );
        break;
      case 'select':
        item = (
          <Select
            {...mergeProps}
          />
        );
        break;
      case 'city-selector':
        item = (
          <CitySelector
            {...mergeProps}
          />
        );
        break;
      case 'search-input':
        item = (
          <SearchInput
            {...mergeProps}
          />
        );
        break;
      case 'date-range':
        item = <RangePicker
          style={{width: '100%'}}
          {...mergeProps}
          size='large'
        />
        break;
      case 'date':
      case 'date-picker':
        item = <DatePicker
          style={{width: '100%'}}
          {...mergeProps}
          size='large'
        />
        break;
      case 'number':
        item = <InputNumber
          style={{width: '100%'}}
          {...mergeProps}
        />
        break;
      default :
        item = (<Input
          {...mergeProps}
        />);
        break;
    }
    return getFieldDecorator(id, fieldDecoratorCfg)(item);
  }

  createFormElements(data = []) {
    let elements = [];
    data.forEach((item, i) => {
      elements.push(
        this.createFormItemWithLabel(item)
      );
    });
    return elements;
  }

  createButtonElements(data) {
    let elements = [];
    data && data.forEach((item, i) => {
      let {
        ...otherProps
      } = item;
      elements.push(
        <Button key={i} {...otherProps}>{item.text}</Button>
      );
    });

    return <div className='filter-buttons-wrapper'>{elements}</div>;
  }

  getFormatFieldsValue = () => {
    const result = this.props.form.getFieldsValue();
    return result;
  }

  handleSearch = (e) => {
    e.preventDefault();
    let result = this.getFormatFieldsValue();
    const {onOk} = this.props;
    onOk && onOk(result);
  }

  toggle = () => {
    const {expand} = this.state;
    this.setState({expand: !expand});
  }

  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
    let result = {};
    const {onReset} = this.props;
    onReset && onReset(result);
  }

  render() {
    const {data, buttonData, className} = this.props;
    const formElements = this.createFormElements(data);
    const buttonElements = this.createButtonElements(buttonData);

    return (
      <Form 
        onSubmit={this.handleSearch}
        onReset={this.handleReset}
        className={classnames('base-form', className)}
      >
        <div className={}>
          {formElements}
          <div className={
            classnames(
              'form-buttons'
            )
          }>{buttonElements}</div>
        </div>
      </Form>
    )
  }

}

BaseForm.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  onOk: PropTypes.func,
  onReset: PropTypes.func,
  buttonData: PropTypes.array,
  defaultPlaceholder: PropTypes.string,
  defaultSelectPlaceholder: PropTypes.string,
};
BaseForm.defaultProps = {
  className: '',
  data: [],
  defaultPlaceholder: '请输入',
  defaultSelectPlaceholder: '请选择',
  buttonData: [
    {
      text: '重置',
      htmlType: 'reset',
      className: 'reset-button',
      type: 'default',
      shape: 'circle'
    },{
      text: '查询',
      htmlType: 'submit',
      className: 'ok-button',
      type: 'primary',
      shape: 'circle'
    }
  ]
};

const WrappedBaseForm = Form.create()(BaseForm);
export default WrappedBaseForm;
