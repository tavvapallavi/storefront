# Shelf – React Storefront

A responsive product browsing app built with React, using the DummyJSON API.

## Features
- Debounced search, category filter, sorting, and pagination
- Product detail page with image gallery, discount, and stock status
- Cart built with `useReducer` + Context, persisted in localStorage
- Loading skeletons, error states with retry, and empty states
- Route-level code splitting (`React.lazy`), lazy-loaded images
- Accessible controls (labels, keyboard focus, ARIA)
- Unit tests with Vitest and React Testing Library

## Tech stack
React 18, React Router 6, Vite, Vitest, React Testing Library

## Run locally
    npm install
    npm run dev
    npm test

## Deploy
Push to GitHub, import the repo in Vercel or Netlify (build: `npm run build`, output: `dist`).
For Netlify add a `_redirects` file in `public/` containing `/* /index.html 200` so page refreshes work on routes.
##Screenshots
<img width="1461" height="862" alt="Screenshot 2026-10-02 114156" src="https://github.com/user-attachments/assets/db3598ac-0109-4f36-a39f-5e6f13d78e2b" />
<img width="1852" height="948" alt="Screenshot 2026-10-02 114106" src="https://github.com/user-attachments/assets/9095c7df-7bc3-4342-b386-e16ed75a43e7" />


