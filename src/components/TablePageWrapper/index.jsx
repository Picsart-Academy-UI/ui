import useStylesMain from '../../hooks/useStylesMain';

const TablePageWrapper = ({ children }) => {
  const classesMain = useStylesMain();
  return <div className={classesMain.tablePageWidth}>{children}</div>;
};

export default TablePageWrapper;
