import { cleanUrl } from './clean-url';

describe('cleanUrl test', () => {
  it('returns correct url or undefined', () => {
    const result = cleanUrl('https://i.imgur.com/SolkFEB.jpeg&quot;]');

    expect(result).toBe('https://i.imgur.com/SolkFEB.jpeg');
  });

  it('returns correct url or undefined', () => {
    const result = cleanUrl('httgsgsgeewegwegw');

    expect(result).toBeUndefined();
  });
});
