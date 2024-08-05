import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
}

function ButtonLink(props: ButtonLinkProps) {
  const { to, onClick, children, color = 'primary', variant = 'contained' } = props;

  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button variant={variant} color={color} onClick={onClick}>
        {children}
      </Button>
    </Link>
  );
}

export default ButtonLink;
