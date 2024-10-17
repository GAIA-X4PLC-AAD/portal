import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

export const withRouter = (component: ReactNode) => (
  <>
    <MemoryRouter>{component}</MemoryRouter>
  </>
)
