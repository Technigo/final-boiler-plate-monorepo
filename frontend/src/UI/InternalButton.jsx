import { Link } from 'react-router-dom';
import { InternalStyledButton } from './UI/StyledButtons';

export const InternalButton = ({ to, children, ...props }) => {
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <InternalStyledButton {...props}>{children}</InternalStyledButton>
        </Link>
    );
};
