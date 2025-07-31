import React from 'react';
import ReactDOM from 'react-dom/client';

// Mock your App component
jest.mock('./App', () => () => <div>Mocked App</div>);

// Mock DOM element
const mockRoot = {
  render: jest.fn(),
} as unknown as ReactDOM.Root;

describe('index.tsx', () => {
  it('should render App inside StrictMode', () => {
    const createRootSpy = jest.spyOn(ReactDOM, 'createRoot').mockReturnValue(mockRoot);

    // Create a fake div#root for testing
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    // Now import the file (delayed import after setup)
    require('./index');

    expect(createRootSpy).toHaveBeenCalledWith(rootElement);
    expect(mockRoot.render).toHaveBeenCalled();

    // Cleanup
    createRootSpy.mockRestore();
  });
});
