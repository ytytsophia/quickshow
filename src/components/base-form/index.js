import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  DatePicker,
  Input,
  InputNumber,
  Form,
  Button
} from 'antd';
import SYSelect from '../sy-select';
import _ from 'lodash';
import classnames from 'classnames';
// import SearchInput from './SearchInput';
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
    const item = this.createFormItem(element);
    let {label, placeholder, formItemConfig} = element;
    label = label ? label : placeholder;
    if('formItemConfig' in element) delete element.formItemConfig;
    return (
      <FormItem 
        key={element.id} 
        className={ element.type === 'hidden' ? 'no-display': ''}
        label={label}
        {...formItemConfig}
      > 
        {item} 
      </FormItem>
    );
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
      fieldConfig,
      ...otherProps
    } = element;

    let defaultPlaceholder = `${this.props.defaultPlaceholder}${label}`; 
    placeholder = placeholder ? placeholder : defaultPlaceholder;
    
    fieldConfig = {
      initialValue: defaultValue || value,
      onChange: onChange,
      ...fieldConfig
    };
    const w100 = {width: '100%'};
    const mergeProps = _.merge({placeholder},otherProps);
    switch (type) {
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
          <SYSelect
            {...mergeProps}
          />
        );
        break;
      // case 'city-selector':
      //   item = (
      //     <CitySelector
      //       {...mergeProps}
      //     />
      //   );
      //   break;
      // case 'search-input':
      //   item = (
      //     <SearchInput
      //       {...mergeProps}
      //     />
      //   );
      //   break;
      case 'date-range':
        item = <RangePicker
          style={w100}
          size='large'
          {...mergeProps}
        />;
        break;
      case 'date':
      case 'date-picker':
        item = <DatePicker
          style={w100}
          size='large'
          {...mergeProps}
        />;
        break;
      case 'number':
        item = <InputNumber
          style={w100}
          {...mergeProps}
        />;
        break;
      default :
        item = (<Input
          {...mergeProps}
        />);
        break;
    }
    return getFieldDecorator(id, fieldConfig)(item);
  }

  createFormElements(data = []) {
    let elements = [];
    data.forEach((item) => {
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

    return <div className='buttons-wrapper'>{elements}</div>;
  }

  handleSearch = (e) => {
    e.preventDefault();

    let result = this.props.form.getFieldsValue();
    const {onOk} = this.props;

    onOk && onOk(_.omitBy(result, _.isUndefined));
  }

  toggle = () => {
    const {expand} = this.state;
    this.setState({expand: !expand});
  }

  handleReset = (e) => {
    e.preventDefault();

    let result = this.props.form.getFieldsValue();
    const {onReset} = this.props;

    this.props.form.resetFields();
    onReset && onReset(_.omitBy(result, _.isUndefined));
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
        <div>
          {formElements}
          <div className={
            classnames(
              'form-buttons'
            )
          }>{buttonElements}</div>
        </div>
      </Form>
    );
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
      type: 'default'
    },{
      text: '查询',
      htmlType: 'submit',
      className: 'ok-button',
      type: 'primary'
    }
  ]
};

const WrappedBaseForm = Form.create()(BaseForm);
export default WrappedBaseForm;
