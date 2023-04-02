import React, { ChangeEventHandler } from 'react';
import styles from './sortingFilter.module.scss';

interface SortingFilterProps {
  value: number;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const sortingList = [
  { id: 1, name: '최신순' },
  { id: 2, name: '난이도순' },
  { id: 3, name: '조리시간 순' }
];

export default function SortingFilter(props: SortingFilterProps) {
  const { value, onChange } = props;

  return (
    <div className={styles.sortingFilter}>
      <select value={value} onChange={onChange}>
        {sortingList?.map((sort: { id: number; name: string }) => (
          <option key={sort.id} value={sort.id}>
            {sort.name}
          </option>
        ))}
      </select>
    </div>
  );
}
