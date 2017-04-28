export const testObj1 = {
  object1: {
    object1: 'object_value1',
    array1: [
      { object3: 'object_value_3' },
      ['array_1', 'array_2', 'array_3', ['nested_array_1', 'nested_array_2']],
      { function1: function testFunc1 () { } },
      12353252,
      { object1: {
        embedded1: 'embedded1',
        embedded2: false,
        embedded3: [
          'item3',
          'item2',
          'item1'
        ]
      } },
      { object2: 'object_value_2' }
    ],
    object2: 'object_value2'
  },
  array1: [
    'item2',
    'item3',
    'item1'
  ],
  bool1: true,
  number1: 3925.25,
  date1: new Date('1982-01-16'),
  function2: function testFunc2 () { },
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
          array2: [
            'item1',
            'item2'
          ],
          bool1: false,
          number2: 52528352,
          function2: function testFunc3 () { }
        }
      }
    }
  },
  func4: function testFunc4 () {
    var a = true;
    var b = a;
    a = b;
  }
};
