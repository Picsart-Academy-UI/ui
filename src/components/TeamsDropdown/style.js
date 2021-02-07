import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
}));

const getStyleMenuItem = (name, personName, theme) => ({
  fontWeight:
    personName.indexOf(name) === -1
      ? theme.typography.fontWeightLight
      : theme.typography.fontWeightBold,
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export { getStyleMenuItem, MenuProps };
export default useStylesLocal;
