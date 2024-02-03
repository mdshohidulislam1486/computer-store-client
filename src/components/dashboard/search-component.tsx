import React from 'react';
import { Select } from 'antd';
type FunctionProps = {
  options: {
    value: string;
    label: string;
  }[];
  handleSelect: (value: string) => void;
  label: string;
};
const SelectOptoin: React.FC<FunctionProps> = ({
  options,
  handleSelect,
  label,
}) => {
  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>{label}</h3>
      <Select
        showSearch
        allowClear={true}
        style={{
          width: 200,
        }}
        onSelect={handleSelect}
        placeholder={label}
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        options={options}
      />
    </div>
  );
};
export default SelectOptoin;
