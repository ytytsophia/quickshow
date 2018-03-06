import React from 'react';
import { storiesOf } from '@storybook/react';
import BaseForm from '../../components/base-form';
import moment from 'moment';

const data = [
  {
    'id': 'driverName',
    'placeholder': '司机姓名',
    'type': 'text'
  },
  {
    'id': 'idCard',
    'placeholder': '司机身份证号',
    'type': 'text'
  },
  {
    'id': 'phone',
    'placeholder': '司机手机号',
    'type': 'text',
    defaultValue: '15618971727'
  },
  {
    'id': 'isEnabled',
    'placeholder': '是否生效',
    'type': 'switch',
    defaultValue: false
  },
  {
    id: 'city',
    placeholder: '城市',
    type: 'select',
    'showSearch': true,
    options: [{
      label: '北京',
      value: 0,
      children: [{
        label: '北京市',
        value: 11
      }]
    },{
      label: '江苏省',
      value: 1,
      children: [{
        label: '南京市',
        value: 12
      },{
        label: '扬州市',
        value: 13
      }]
    }]
  },
  {
    'id': 'bisinessIds',
    'placeholder': '已开业务',
    'type': 'select',
    'showSearch': true,
    'mode': 'multiple',
    options: [{
      label: '业务1',
      value: 'business1'
    },{
      label: '业务2',
      value: 'business2'
    }]
  },
  {
    'id': 'tagIds',
    'placeholder': '司机标签',
    'type': 'select',
    'multi': true,
    'showSearch': true,
    options: [{
      label: '标签1',
      value: 'tag1'
    }]
  },{
    id: 'allocateTime',
    placeholder: ['分发时间段'],
    type: 'date-range',
    format: 'YYYY-MM-DD HH:mm',
    showTime: { 
      format: 'HH:mm'
    },
    value: [moment().subtract(30, 'days'),moment()]
  }
];
storiesOf('BaseForm', module)
  .add('default layout', () => <BaseForm data={data}/>);
