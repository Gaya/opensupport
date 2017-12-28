import { sortByCount, jsonToDependencies } from '../../src/scan/helpers';

describe('Sort by count', () => {
  it('Should correctly compare count if bigger', () => {
    expect(sortByCount({ count: 1 }, { count: 2 })).toBe(1);
  });

  it('Should correctly compare count if smaller', () => {
    expect(sortByCount({ count: 2 }, { count: 1 })).toBe(-1);
  });

  it('Should correctly compare count if the same', () => {
    expect(sortByCount({ count: 1 }, { count: 1 })).toBe(0);
  });
});

describe('Merge dependencies', () => {
  it('Should merge dependencies to an array', () => {
    const input = {
      dependencies: { test: 'dep', more: 'test' },
    };

    const output = ['test', 'more'];

    expect(jsonToDependencies(input)).toEqual(output);
  });

  it('Should merge development dependencies to an array', () => {
    const input = {
      devDependencies: { test: 'dep', more: 'test' },
    };

    const output = ['test', 'more'];

    expect(jsonToDependencies(input)).toEqual(output);
  });

  it('Should merge development and normal dependencies to an array', () => {
    const input = {
      dependencies: { test: 'dep', more: 'test' },
      devDependencies: { testDev: 'dep', moreDev: 'test' },
    };

    const output = ['test', 'more', 'testDev', 'moreDev'];

    expect(jsonToDependencies(input)).toEqual(output);
  });
});
