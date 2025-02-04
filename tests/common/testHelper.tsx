import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { Route, Routes } from 'react-router-dom';

/**
 * Wraps a component with a MemoryRouter.
 * @param component - The React node to wrap.
 * @param initialEntry - (Optional) The initial route for the router.
 * @param path - (Optional) The route path to render the component.
 */
export const withRouter = (component: ReactNode, initialEntry?: string, path?: string) => {
  if (initialEntry && path) {
    return (<>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path={path} element={component}/>
        </Routes>
      </MemoryRouter>
    </>);
  }
  return (<>
    <MemoryRouter>
      {component}
    </MemoryRouter>
  </>)
}
