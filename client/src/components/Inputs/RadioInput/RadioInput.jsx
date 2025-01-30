import classes from './styles/RadioInput.module.css';

const RadioInput = ({children, name, value, checked, onChange}) => {

    return (
        <label className={classes.wrapper}>
            <input
                className={classes.radio}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span className={classes.subRadio}></span>
            {children}
        </label>
    );
};

export default RadioInput;