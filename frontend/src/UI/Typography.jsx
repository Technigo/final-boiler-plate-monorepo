import PropTypes from 'prop-types';
import styles from './Typography.module.css';

export const Text = ({ children, type, style, className }) => {
    const textClassName = `${styles[type] || ''} ${className || ''}`;

    return (
        <div className={textClassName} style={style}>
            {children}
        </div>
    );
};

// Adding PropTypes for validation (optional but recommended)
Text.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
};

export default Text;
