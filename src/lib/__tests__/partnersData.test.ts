import { partners } from '../partnersData';

describe('Partners Data', () => {
  it('should export partners array', () => {
    expect(partners).toBeDefined();
    expect(Array.isArray(partners)).toBe(true);
  });

  it('should have partners with required properties', () => {
    if (partners.length > 0) {
      const partner = partners[0];
      expect(partner).toHaveProperty('name');
      expect(partner).toHaveProperty('description');
      expect(partner).toHaveProperty('logo');
      expect(partner).toHaveProperty('website');
    }
  });

  it('should have valid partner data types', () => {
    if (partners.length > 0) {
      const partner = partners[0];
      expect(typeof partner.name).toBe('string');
      expect(typeof partner.description).toBe('string');
      expect(typeof partner.logo).toBe('string');
      expect(typeof partner.website).toBe('string');
    }
  });
});
