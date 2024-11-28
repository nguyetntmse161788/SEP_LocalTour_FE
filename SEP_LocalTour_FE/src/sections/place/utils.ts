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
  // Chuyển đổi filterStatus từ chuỗi thành số
  let statusFilterValue: number | null = null;
  if (filterStatus === 'Pending') {
    statusFilterValue = 0;
  } else if (filterStatus === 'Approved') {
    statusFilterValue = 1;
  } else if (filterStatus === 'Rejected') {
    statusFilterValue = 2;
  }

  // Lọc dữ liệu theo tên và status
  const filteredData = inputData.filter((place) => {
    const status = Number(place.status); // Ép kiểu về number
    const matchesStatus = statusFilterValue !== null ? status === statusFilterValue : true;

    return matchesStatus;
  });

  // Sắp xếp dữ liệu theo comparator
  return filteredData.sort(comparator);
};
