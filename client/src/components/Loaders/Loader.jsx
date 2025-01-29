import Load from './assets/loader.svg'
import styles from './styles/Loader.module.css'

const Loader = () => {
    return (
        <img className={styles.container} src={Load} alt="Loading..." />
    );
};

export default Loader;