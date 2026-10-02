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


