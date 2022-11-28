import { Pagination } from 'antd';
import { ReactNode } from 'react';
import './ItemsPage.scss';

interface ItemsPageI<T> {
  items: T[];
  ItemRender: any;
  title: string;
  loading?: boolean;
  additionalContent?: ReactNode
  pagination: {
    total: number;
    current: number;
    onPaginate: (page: number) => void;
  };
}

const ItemsPage = <T,>(props: ItemsPageI<T>) => {
  const { ItemRender, title, items, pagination, loading, additionalContent } = props;

  return (
    <div className='items-page'>
      <div className='items-page-container'>
        <div className='title'>
          <h1>{title}</h1>
        </div>
        {additionalContent}
        <div className='items-wrapper'>
          {items.map((item, i) => (
            <div className='item' key={i}>
              <ItemRender {...item} loading={loading} />
            </div>
          ))}
        </div>
        <div className='pagination-wrapper'>
          <Pagination
            onChange={pagination.onPaginate}
            defaultCurrent={pagination.current}
            total={pagination.total}
            pageSizeOptions={[]}
            pageSize={20}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
