---
title: Select - 选择器
nav:
  title: 组件
  path: /client
group:
  order: 1
  title: Schemas
  path: /client/schemas
---

# Select - 选择器

## 节点树

<pre lang="tsx">
// 常规选择器
<Select/>
// 选项值为对象类型
<Select.Object>
// 抽屉选择器
<Select.Drawer>
  // 可选项
  <Select.Options>
    <Form>
      <Table>
        <Action/>
      </Table>
    </Form>
  </Select.Options>
  // 选中项详情
  <Select.OptionTag>
    <Form>
      // 添加其他节点
    </Form>
  </Select.OptionTag>
</Select.Drawer>
</pre>

## Select

### 单选

```tsx
import React from 'react';
import { SchemaRenderer } from '../';

const options = [
  {
    label: '选项1',
    value: 1,
    color: 'red',
  },
  {
    label: '选项2',
    value: 2,
    color: 'blue',
  },
];

const schema = {
  type: 'object',
  properties: {
    input: {
      interface: 'string',
      type: 'string',
      title: `编辑模式`,
      name: 'name1',
      enum: options,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-reactions': {
        target: 'read',
        fulfill: {
          state: {
            value: '{{$self.value}}',
          },
        },
      },
    },
    read: {
      interface: 'string',
      type: 'string',
      title: `阅读模式`,
      enum: options,
      name: 'name2',
      'x-read-pretty': true,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  }
};

export default () => {
  return (
    <SchemaRenderer schema={schema}/>
  );
};
```

### 多选

```tsx
import React from 'react';
import { SchemaRenderer } from '../';

const options = [
  {
    label: '选项1',
    value: 1,
    color: 'red',
  },
  {
    label: '选项2',
    value: 2,
    color: 'blue',
  },
];

const schema = {
  type: 'object',
  properties: {
    input: {
      interface: 'string',
      type: 'string',
      title: `编辑模式`,
      name: 'name1',
      enum: options,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        mode: 'tags',
      },
      'x-reactions': {
        target: 'read',
        fulfill: {
          state: {
            value: '{{$self.value}}',
          },
        },
      },
    },
    read: {
      interface: 'string',
      type: 'string',
      title: `阅读模式`,
      enum: options,
      'x-read-pretty': true,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        mode: 'tags',
      },
    },
  }
}

export default () => {
  return (
    <SchemaRenderer schema={schema} />
  );
};
```

### 分组

```tsx
import React from 'react';
import { SchemaRenderer } from '../';

const dataSource = [
  {
    label: 'Manager',
    children: [
      {value: 'jack', label: 'Jack'},
    ],
  },
  {
    label: 'Engineer',
    children: [
      {value: 'lucy', label: 'Lucy'},
    ],
  },
];

const schema = {
  type: 'object',
  properties: {
    input: {
      interface: 'select',
      type: 'number',
      title: `编辑模式`,
      enum: dataSource,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: 'please enter',
      },
      'x-reactions': {
        target: 'read',
        fulfill: {
          state: {
            value: '{{$self.value}}',
          },
        },
      },
    },
    read: {
      interface: 'select',
      type: 'number',
      title: `阅读模式`,
      required: true,
      enum: dataSource,
      'x-read-pretty': true,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: 'please enter',
      },
    }
  }
};

export default () => {
  return (
    <SchemaRenderer schema={schema}/>
  );
};
```

## Select.Object

选项值为 Object 类型

### 单选

```tsx
import React from 'react';
import { SchemaRenderer } from '../';

const dataSource = [
  {
    id: 1,
    title: '标题1',
  },
  {
    id: 2,
    title: '标题2',
  },
  {
    id: 3,
    title: '标题3',
  },
];

const schema = {
  type: 'object',
  properties: {
    input: {
      interface: 'select',
      type: 'string',
      title: `编辑模式`,
      enum: dataSource,
      'x-decorator': 'FormItem',
      'x-component': 'Select.Object',
      'x-component-props': {
        placeholder: 'please enter',
        // mode: 'tags',
        fieldNames: {
          label: 'title',
          value: 'id',
        },
      },
      'x-reactions': {
        target: 'read',
        fulfill: {
          state: {
            value: '{{$self.value}}',
          },
        },
      },
    },
    read: {
      interface: 'select',
      type: 'string',
      title: `阅读模式`,
      enum: dataSource,
      'x-read-pretty': true,
      'x-decorator': 'FormItem',
      'x-component': 'Select.Object',
      'x-component-props': {
        placeholder: 'please enter',
        // mode: 'tags',
        fieldNames: {
          label: 'title',
          value: 'id',
        },
      },
    }
  }
};

export default () => {
  return (
    <SchemaRenderer schema={schema} />
  );
};
```

### 多选

```tsx
import React from 'react';
import { SchemaRenderer } from '../';

const dataSource = [
  {
    id: 1,
    title: '标题1',
  },
  {
    id: 2,
    title: '标题2',
  },
  {
    id: 3,
    title: '标题3',
  },
];

const schema = {
  type: 'object',
  properties: {
    input: {
      interface: 'select',
      type: 'string',
      title: `编辑模式`,
      enum: dataSource,
      'x-decorator': 'FormItem',
      'x-component': 'Select.Object',
      'x-component-props': {
        placeholder: 'please enter',
        mode: 'tags',
        fieldNames: {
          label: 'title',
          value: 'id',
        },
      },
      'x-reactions': {
        target: 'read',
        fulfill: {
          state: {
            value: '{{$self.value}}',
          },
        },
      },
    },
    read: {
      interface: 'select',
      type: 'string',
      title: `阅读模式`,
      enum: dataSource,
      'x-read-pretty': true,
      'x-decorator': 'FormItem',
      'x-component': 'Select.Object',
      'x-component-props': {
        placeholder: 'please enter',
        mode: 'tags',
        fieldNames: {
          label: 'title',
          value: 'id',
        },
      },
    }
  }
};

export default () => {
  return (
    <SchemaRenderer schema={schema} />
  );
};
```

## Select.Drawer

```tsx
import React from 'react';
import { SchemaRenderer } from '../';
import { useSelect, useOptionTagValues } from './';

console.log({ useSelect })

const dataSource = [
  {
    id: 1,
    title: '标题1',
  },
  {
    id: 2,
    title: '标题2',
  },
  {
    id: 3,
    title: '标题3',
  },
];

function useValues() {
  return {
    table: dataSource,
  }
}

const schema = {
  type: 'object',
  properties: {
    input: {
      interface: 'select',
      type: 'string',
      title: `编辑模式`,
      enum: dataSource,
      default: [
        {
          id: 1,
          title: '标题1',
        },
        {
          id: 2,
          title: '标题2',
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select.Drawer',
      'x-component-props': {
        placeholder: 'please enter',
        mode: 'tags',
        fieldNames: {
          label: 'title',
          value: 'id',
        },
      },
      'x-reactions': {
        target: 'read',
        fulfill: {
          state: {
            value: '{{$self.value}}',
          },
        },
      },
      properties: {
        options: {
          type: 'void',
          'x-component': 'Select.Options',
          properties: {
            form: {
              type: 'void',
              'x-component': 'Form',
              'x-component-props': {
                useValues: '{{ useValues }}',
              },
              properties: {
                table: {
                  type: 'array',
                  'x-component': 'Table',
                  properties: {
                    actionbar: {
                      type: 'void',
                      'x-component': 'Table.ActionBar',
                      'x-component-props': {
                        align: 'bottom',
                      },
                      properties: {
                        action: {
                          type: 'void',
                          'x-component': 'Action',
                          'x-component-props': {
                            useAction: '{{ useSelect }}',
                          },
                          title: '确定',
                        },
                      },
                    },
                    column1: {
                      type: 'void',
                      title: '标题',
                      'x-component': 'Table.Column',
                      'x-component-props': {
                        // title: 'z1',
                      },
                      // 'x-designable-bar': 'Table.Column.DesignableBar',
                      properties: {
                        title: {
                          type: 'string',
                          required: true,
                          'x-read-pretty': true,
                          'x-decorator-props': {
                            feedbackLayout: 'popover',
                          },
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    read: {
      interface: 'select',
      type: 'string',
      title: `阅读模式`,
      enum: dataSource,
      default: [
        {
          id: 1,
          title: '标题1',
        },
        {
          id: 2,
          title: '标题2',
        },
      ],
      'x-read-pretty': true,
      'x-decorator': 'FormItem',
      'x-component': 'Select.Drawer',
      'x-component-props': {
        placeholder: 'please enter',
        mode: 'tags',
        fieldNames: {
          label: 'title',
          value: 'id',
        },
      },
      properties: {
        option: {
          type: 'void',
          'x-component': 'Select.OptionTag',
          properties: {
            form: {
              type: 'void',
              'x-component': 'Form',
              'x-component-props': {
                useValues: '{{ useOptionTagValues }}',
              },
              properties: {
                title: {
                  type: 'string',
                  title: '标题',
                  'x-read-pretty': true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
          },
        },
      },
    }
  }
};

export default () => {
  return (
    <SchemaRenderer scope={{ useSelect, useValues, useOptionTagValues }} schema={schema} />
  );
};
```

<!-- 
<Select />
<Select.Object />
<Select.Drawer>
  <Select.Options>
    <Table />
    <Action />
  <Select.Options>
  <Select.ItemDetails>
    <Form/>
  </Select.ItemDetails>
<Select.Drawer>

<Action />

<Action>
  <Drawer />
</Action>
 -->