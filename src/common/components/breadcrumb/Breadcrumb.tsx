import { Breadcrumbs } from '@mui/material';
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import { ARROW_RIGHT } from '../../../utils/symbols';

import styles from './Breadcrumb.module.css';

export interface IBreadcrumb {
    label: string;
    to: string;
}

interface BreadcrumbProps {
    className?: string;
    breadcrumbs: IBreadcrumb[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ className, breadcrumbs }) => {
  return (
    <Breadcrumbs
      className={classnames([className, styles.breadcrumbs])}
      separator={<span
        className={classnames(styles.breadcrumbs, styles.breadcrumbSeparator)}>{ARROW_RIGHT}</span>}
      aria-label="breadcrumb"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <Link className={classnames([styles.breadcrumbs, styles.breadcrumbLink])}
          key={index} to={breadcrumb.to}>{breadcrumb.label}</Link>))
      }
    </Breadcrumbs>
  );
};
