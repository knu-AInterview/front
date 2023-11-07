import React from "react";
import { Pagination } from "react-bootstrap";

// 컴포넌트 재사용을 위해 url처리 고민해야 함

const Paginate = ({ active, lastPageNo }) => {
  let items = [];
  for (let number = active - 2; number <= active + 2; number++) {
    if (number >= 1 && number <= lastPageNo) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          href={`/interview/record/${number}`}
        >
          {number}
        </Pagination.Item>
      );
    }
  }

  return (
    <div>
      Paginate
      <Pagination>
        <Pagination.First href={`/interview/record/${1}`} />
        <Pagination.Prev
          href={`/interview/record/${active === 1 ? 1 : active - 1}`}
        />
        {items}
        <Pagination.Next
          href={`/interview/record/${
            active === lastPageNo ? lastPageNo : active + 1
          }`}
        />
        <Pagination.Last href={`/interview/record/${lastPageNo}`} />
      </Pagination>
    </div>
  );
};

export default Paginate;
