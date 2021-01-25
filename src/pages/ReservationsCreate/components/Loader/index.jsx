import useStyles from './style';

const Loader = () => {
  const styles = useStyles();
  console.log(styles);
  return <div className={styles.loaderWrapper}>Loading ...</div>;
};

export default Loader;
