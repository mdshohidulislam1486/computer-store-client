import { MouseEventHandler, useEffect, useState } from 'react';
import SelectOptoion from './search-component.tsx';
import { Button, Input } from 'antd';
const { Search } = Input;
type TResult = {
  label: string;
  value: string;
};
type FunctionProps = {
  filterProps: {
    data: {
      category: string;
      brand: string;
      price: string;
      interface: string;
      condition: string;
      color: string;
      capacity: string;
      [key: string]: string;
    }[];
    filterType: string;
    handleClearFilter: MouseEventHandler;
    setFilterType: React.Dispatch<React.SetStateAction<string>>;
    setFilterParams?: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleDeleteMultiItem: MouseEventHandler<HTMLElement> | undefined;
    selectedRowKeys: React.Key[];
    setSearchItem: React.Dispatch<
      React.SetStateAction<{
        searchTerm: string;
      }>
    >;
  };
};
const FilterSection: React.FC<FunctionProps> = ({ filterProps }) => {
  const {
    data,
    handleClearFilter,
    filterType,
    setFilterType,
    setFilterParams,
    handleDeleteMultiItem,
    selectedRowKeys,
    setSearchItem,
  } = filterProps;
  const [filterOption, setFilterOption] = useState<TResult[]>([]);

  const options = [
    {
      value: 'category',
      label: 'Category',
    },
    {
      value: 'brand',
      label: 'Brand',
    },
    {
      value: 'compatibility',
      label: 'Compatibility',
    },
    {
      value: 'price',
      label: 'Price',
    },
    {
      value: 'interface',
      label: 'Interface',
    },
    {
      value: 'condition',
      label: 'Condition',
    },
    {
      value: 'capacity',
      label: 'Capacity',
    },
    {
      value: 'color',
      label: 'Color',
    },
  ];

  const handleSelectFilterTypes = (value: string) => {
    setFilterType(value);
    setFilterParams!(undefined);
  };

  const handleSelectFilterParams = (value: string) => {
    setFilterParams!(value);
  };

  useEffect(() => {
    if (filterType) {
      const filterQuery: TResult[] = data.reduce((result, item) => {
        const getItem: string = item[filterType];

        if (
          !result.some(
            (obj) => obj.label.toLowerCase() === getItem.toLowerCase()
          )
        ) {
          result.push({ label: getItem, value: getItem });
        }

        return result;
      }, [] as TResult[]);

      setFilterOption(filterQuery);
    }
  }, [filterType]);
  useEffect(() => {}, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const serchObjet = {
      searchTerm: searchValue,
    };
    setSearchItem(serchObjet);
  };
  return (
    <div
      className="table-filter-sec-main"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end',
          flexWrap: 'wrap',
        }}
      >
        <SelectOptoion
          options={options}
          handleSelect={handleSelectFilterTypes}
          label={'Select Filter Item'}
        />
        {filterType === 'price' ? (
          <div>
            <h3 style={{ marginBottom: 10 }}>Add Maximum Price Range</h3>
            <Input
              placeholder="Basic usage"
              onChange={(e) => setFilterParams!(e.target.value)}
            />
          </div>
        ) : (
          <SelectOptoion
            options={filterOption}
            handleSelect={handleSelectFilterParams}
            label={`${
              filterType
                ? `Filter by ${filterType}`
                : 'Select Filter Type First'
            }`}
          />
        )}

        <Button onClick={handleClearFilter}>Clear Filter</Button>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end',
          flexWrap: 'wrap',
        }}
      >
        {selectedRowKeys && selectedRowKeys.length > 0 && (
          <Button
            onClick={handleDeleteMultiItem}
            style={{ color: 'white', backgroundColor: 'darkorange' }}
          >
            Delete Selected{selectedRowKeys.length === 1 ? ' Item' : ' Items'}
          </Button>
        )}
        <Search
          placeholder="input search text"
          onChange={onSearch}
          style={{ width: 200 }}
        />
      </div>
    </div>
  );
};

export default FilterSection;
