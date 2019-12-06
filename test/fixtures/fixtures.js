const testObj1 = {
  object1: {
    object1: 'object_value1',
    array1: [
      { object3: 'object_value_3' },
      ['array_1', 'array_2', 'array_3', ['nested_array_1', 'nested_array_2']],
      { function1: function testFunc1() {} },
      12353252,
      {
        object1: {
          embedded1: 'embedded1',
          embedded2: false,
          embedded3: ['item3', 'item2', 'item1']
        }
      },
      { object2: 'object_value_2' }
    ],
    object2: 'object_value2'
  },
  array1: ['item2', 'item3', 'item1'],
  bool1: true,
  number1: 3925.25,
  function2: function testFunc2() {},
  emptyArray1: [],
  emptyObject1: {},
  emptyString: '',
  nestedObject1: {
    nestedObject2: {
      nestedObject3: {
        nestedObject4: {
          object2: {
            object_key3: 'object_value1'
          },
          array2: ['item1', 'item2'],
          bool1: false,
          number2: 52528352,
          function2: function testFunc3() {}
        }
      }
    }
  },
  func4: function testFunc4() {
    let a = true;
    const b = a;
    a = b;
  }
};

const testMultiline1 = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
].join('\n');

exports = module.exports = {
  testObj1,
  testMultiline1
};
