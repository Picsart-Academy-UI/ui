import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles(() => ({
  formControl: {
    width: 360,
    minWidth: 120,
  },
}));

const getStyleMenuItem = (name, personName, theme) => ({
  fontWeight:
    personName.indexOf(name) === -1
      ? theme.typography.fontWeightLight
      : theme.typography.fontWeightBold,
});

export { getStyleMenuItem };
export default useStylesLocal;
