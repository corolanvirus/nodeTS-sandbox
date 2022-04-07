describe('test', () => {
  test('add', async () => {
    expect(1 + 1).toEqual(2);
  });
});

describe('test 2', () => {
  test('less', async () => {
    expect(1 - 1).toEqual(0);
  });
});

describe('test 3', () => {
  test('contains', async () => {
    expect('test@test.test').toContain('@');
  });
});
