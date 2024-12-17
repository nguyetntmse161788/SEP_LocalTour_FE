import type { TagProps } from './tag-table-row';

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
  a: {
    [key in Key]: number | string;
  },
  b: {
    [key in Key]: number | string;
  }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}




// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: TagProps[];
  filterName: string;
  comparator: (a: any, b: any) => number;
};

export const applyFilter = ({
  inputData,
  comparator,
  filterName,
  filterStatus,
}: {
  inputData: TagProps[];
  comparator: (a: TagProps, b: TagProps) => number;
  filterName: string;
  filterStatus: string | null; // Trạng thái có thể là 'Pending', 'Approved', 'Rejected' hoặc null
}) => {
  const filteredData = [...inputData];

  // if (filterName) {
  //   filteredData = filteredData.filter((event) =>
  //     event.name.toLowerCase().includes(filterName.toLowerCase())
  //   );
  // }

  // if (filterStatus) {
  //   filteredData = filteredData.filter((event) => event.status === filterStatus);
  // }

  filteredData.sort(comparator);

  return filteredData;
};
