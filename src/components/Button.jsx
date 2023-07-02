import PropTypes from 'prop-types';
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
    primary: "primary",
    secondary: "secondary",
};

function Button({ children, type, variant, ...rest }) {
    return (
        <button
            className={getClasses([
                styles.button,
                styles[`button--${buttonTypes[variant]}`],
            ])}
            type={type === 'submit' ? 'submit' : 'button'}
            {...rest}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['submit', 'button']),
    variant: PropTypes.oneOf(Object.values(buttonTypes)),
};

function SelectButton({ children, ...rest }) {
    return (
        <select className={getClasses([styles.button, styles.button__select])}
        {...rest}
        >
            {children}
        </select>
    )
}

SelectButton.propTypes = {
    children: PropTypes.node.isRequired,
};

export { SelectButton };
export default Button;
