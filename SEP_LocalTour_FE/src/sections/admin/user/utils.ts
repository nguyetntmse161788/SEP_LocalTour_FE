import type { UserProps } from './user-table-row';
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
  inputData: UserProps[];
  filterName: string;
  comparator: (a: any, b: any) => number;
};

type ApplyFilterProps2 = {
  reportData: ReportProps[];
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
    filteredData = filteredData.filter(
      (user) =>
        (user.username && user.username.toLowerCase().includes(lowerCaseFilter)) ||
        (user.email && user.email.toLowerCase().includes(lowerCaseFilter)) ||
        (user.fullName && user.fullName.toLowerCase().includes(lowerCaseFilter)) ||
        (user.phoneNumber && user.phoneNumber.toLowerCase().includes(lowerCaseFilter)) ||
        (user.address && user.address.toLowerCase().includes(lowerCaseFilter)) ||
        (user.gender && user.gender.toLowerCase().includes(lowerCaseFilter)) ||
        (user.role && user.role.toLowerCase().includes(lowerCaseFilter)) ||
        (user.roles && user.roles.some((role) => role.toLowerCase().includes(lowerCaseFilter))) ||
        (user.dateOfBirth && user.dateOfBirth.toLowerCase().includes(lowerCaseFilter)) ||
        (user.profilePictureUrl &&
          user.profilePictureUrl.toLowerCase().includes(lowerCaseFilter)) ||
        (user.endDate &&
          user.endDate.toISOString().toLowerCase().includes(lowerCaseFilter)) // Format date for comparison
    );
  }

  return filteredData;
}


export function applyFilter2({ reportData, comparator, filterName }: ApplyFilterProps2) {
  const stabilizedThis = reportData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  let filteredData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    const lowerCaseFilter = filterName.toLowerCase();

    // Search through multiple fields in the ReportProps
    filteredData = filteredData.filter(
      (report) =>
        (report.content && report.content.toLowerCase().includes(lowerCaseFilter)) || // Search content
        (report.userReportId && report.userReportId.toLowerCase().includes(lowerCaseFilter)) || // Search userReportId
        (report.userId && report.userId.toLowerCase().includes(lowerCaseFilter)) || // Search userId
        (report.status && report.status.toLowerCase().includes(lowerCaseFilter)) || // Search status
        (report.reportDate && report.reportDate.toLowerCase().includes(lowerCaseFilter)) // Search reportDate
    );
  }

  return filteredData;
}
