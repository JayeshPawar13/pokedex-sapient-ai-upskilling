import reportWebVitals from './reportWebVitals';

jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

describe('reportWebVitals', () => {
  it('should call all web vitals with provided onPerfEntry callback', async () => {
    const mockCallback = jest.fn();

    await reportWebVitals(mockCallback);

    const {
      getCLS,
      getFID,
      getFCP,
      getLCP,
      getTTFB,
    } = await import('web-vitals');

    expect(getCLS).toHaveBeenCalledWith(mockCallback);
    expect(getFID).toHaveBeenCalledWith(mockCallback);
    expect(getFCP).toHaveBeenCalledWith(mockCallback);
    expect(getLCP).toHaveBeenCalledWith(mockCallback);
    expect(getTTFB).toHaveBeenCalledWith(mockCallback);
  });

  it('should not throw if onPerfEntry is undefined', async () => {
    await expect(() => reportWebVitals(undefined)).not.toThrow();
  });

  it('should not throw if onPerfEntry is not a function', async () => {
    // @ts-expect-error - simulate invalid input
    await expect(() => reportWebVitals(123)).not.toThrow();
  });
});
