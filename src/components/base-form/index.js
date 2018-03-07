import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  DatePicker,
  Input,
  InputNumber,
  Switch,
  Form,
  Button
} from 'antd';
import _ from 'lodash';
import classnames from 'classnames';
import SmartSelect from '../smart-select';
import SearchInput from '../search-input';
import './style.css';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
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
          <SmartSelect
            {...mergeProps}
          />
        );
        break;
      case 'switch':
        item = (
          <Switch />
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
      case 'textarea':
        item = <TextArea 
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

  createButtonElements(data,buttonLayout) {
    const buttons = data && data.map((item, i) => {
      let {
        ...otherProps
      } = item;
      return <Button key={i} {...otherProps}>{item.text}</Button>;
    });

    return (
      <FormItem
        {...buttonLayout}
        className='buttons-wrapper'>
        {buttons}
      </FormItem>
    );
  }

  handleSubmit = (e) => {
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
    const {
      data, 
      buttonData, 
      buttonLayout, 
      className,
      buttonsClassName,
      formConfig
    } = this.props;
    const formElements = this.createFormElements(data);
    const buttonElements = this.createButtonElements(buttonData,buttonLayout);

    return (
      <Form 
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
        className={classnames('base-form', className)}
        {...formConfig}
      >
        <div>
          {formElements}
          <div className={
            classnames('form-buttons',buttonsClassName)
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
  grid: PropTypes.object,
  buttonData: PropTypes.array,
  defaultPlaceholder: PropTypes.string,
  defaultSelectPlaceholder: PropTypes.string,
  buttonsClassName: PropTypes.string,
  formConfig: PropTypes.object
};
BaseForm.defaultProps = {
  className: '',
  data: [],
  defaultPlaceholder: '请输入',
  defaultSelectPlaceholder: '请选择',
  grid: {
    row: {
      gutter: 6
    },
    col: {
      xs: 6,
      sm: 8
    }
  },
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
