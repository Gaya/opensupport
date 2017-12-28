import { packageCountOfProject } from '../../src/scan/packages';

describe('Determine package count for projects', () => {
  it('Correctly sum up dependencies and children', () => {
    const input = [{ name: 'test', maintainers: [{ name: 'Gaya' }] }, { name: 'dev' }];
    const output = [
      { name: 'test', count: 1, maintainers: ['Gaya'] },
      { name: 'dev', count: 1, maintainers: [] },
    ];

    expect(packageCountOfProject(input)).toEqual(output);
  });
});
