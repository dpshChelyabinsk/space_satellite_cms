import classes from './styles/TextInput.module.css';

const TextInput = ({id, type, placeholder, value, onChange, required}) => {

    return (
        <div>

            <input
                className={classes.container}
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default TextInput;