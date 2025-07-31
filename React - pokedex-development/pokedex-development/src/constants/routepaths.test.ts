import { ROUTES } from './routepaths';

describe('ROUTES constant', () => {
  it('should contain correct paths', () => {
    expect(ROUTES.HOME).toBe('/');
    expect(ROUTES.DETAILS).toBe('/details/:id');
  });

  it('should replace :id in DETAILS path correctly', () => {
    const id = 25;
    const path = ROUTES.DETAILS.replace(':id', String(id));
    expect(path).toBe('/details/25');
  });
});
