import useStyles from './style';

const Loader = () => {
  const styles = useStyles();
  return <div className={styles.loaderWrapper}>Loading ...</div>;
};

export default Loader;
