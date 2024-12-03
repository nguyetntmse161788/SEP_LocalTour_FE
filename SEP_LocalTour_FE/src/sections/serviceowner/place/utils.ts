import type { UserProps } from './place-table-row';

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

export const getComparator = (order: 'asc' | 'desc', orderBy: string) => (a: UserProps, b: UserProps) => {
  if (orderBy === 'status') {
    const statusA = Number(a.status); // Ép kiểu về number
    const statusB = Number(b.status); // Ép kiểu về number
    return order === 'asc' ? statusA - statusB : statusB - statusA;
  }

  // Các điều kiện so sánh khác nếu cần thiết
  return 0;
};




// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: UserProps[];
  filterName: string;
  comparator: (a: any, b: any) => number;
};

export const applyFilter = ({
  inputData,
  comparator,
  filterName,
  filterStatus,
}: {
  inputData: UserProps[];
  comparator: (a: UserProps, b: UserProps) => number;
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
