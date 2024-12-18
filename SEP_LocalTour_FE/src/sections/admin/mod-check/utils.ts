import type { ModCheckProps } from './mod-check-table-row';
import { ReportProps } from '../report/report-table-row';

// ----------------------------------------------------------------------

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
} as const;

// ----------------------------------------------------------------------

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// ----------------------------------------------------------------------

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// ----------------------------------------------------------------------

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: ModCheckProps[];
  filterName: string;
  comparator: (a: any, b: any) => number;
};

export function applyFilter({ inputData, comparator, filterName }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  let filteredData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    const lowerCaseFilter = filterName.toLowerCase();
  
    filteredData = filteredData.filter((modCheck) => {
      if (
        modCheck.modId.toLowerCase().includes(lowerCaseFilter) ||
        modCheck.modName.toLowerCase().includes(lowerCaseFilter)
      ) {
        return true;
      }
      if (
        modCheck.placeTranslations.some(
          (translation) =>
            translation.languageCode.toLowerCase().includes(lowerCaseFilter) ||
            translation.name.toLowerCase().includes(lowerCaseFilter) ||
            translation.description.toLowerCase().includes(lowerCaseFilter) ||
            translation.address.toLowerCase().includes(lowerCaseFilter) ||
            translation.contact.toLowerCase().includes(lowerCaseFilter)
        )
      ) {
        return true;
      }
      if (
        modCheck.placeMediums.some(
          (medium) =>
            medium.type.toLowerCase().includes(lowerCaseFilter) ||
            medium.url.toLowerCase().includes(lowerCaseFilter)
        )
      ) {
        return true;
      }
      return false;
    });
  }
  return filteredData;
}
