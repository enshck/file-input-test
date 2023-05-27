import './button.css';
import { FC } from 'react';

interface IButtonProps {
  label: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button: FC<IButtonProps> = ({ label }) => <button>{label}</button>;

Button.defaultProps = {
  label: 'Example button',
};
