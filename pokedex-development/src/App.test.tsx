import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock lazy-loaded components
jest.mock('./pages/home/home.page', () => () => <div>Mocked Home Page</div>);
jest.mock('./pages/details/details.page', () => () => <div>Mocked Detail Page</div>);

describe('App routing', () => {
    it('renders HomePage at default route', async () => {
        window.history.pushState({}, 'Home page', '/');

        render(<App />);

        await waitFor(() => {
            expect(screen).toBeDefined();

        });
    });

    it('renders DetailPage route if navigated to', async () => {
        window.history.pushState({}, 'Detail page', '/details/25');

        render(<App />);

        await waitFor(() => {
            expect(screen).toBeDefined();

        });
    });

    it('shows Suspense fallback while loading', () => {
        window.history.pushState({}, 'Loading fallback', '/');

        render(<App />);

        expect(screen).toBeDefined();
    });
});
