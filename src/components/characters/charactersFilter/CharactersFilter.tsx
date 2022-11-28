import { useState, useEffect } from 'react';
import { Radio, RadioChangeEvent, Select } from "antd";
import './CharactersFilter.scss';
import { StatusT, GenderT } from '../../../types';

interface CharactersFilterI {
  fetchNames: (name: string) => Promise<string[]>
  onOptionsChange?: (value?: FilterOptionsI) => void;
}

interface SelectNameItemI {
  label: React.ReactNode;
  value: string;
  key: number;
}

export interface FilterOptionsI {
  name?: string;
  gender?: GenderT;
  status?: StatusT;
}

const CharactersFilter = (props: CharactersFilterI) => {
  const { fetchNames, onOptionsChange } = props;
  const [names, setNames] = useState<SelectNameItemI[]>([]);
  const [timeoutId, setTimeoutId] = useState<number>(0);
  const [options, setOptions] = useState<FilterOptionsI>();

  useEffect(() => {
    onOptionsChange && onOptionsChange(options);
  }, [options])

  const onNameSearch = async (value: string) => {
    clearTimeout(timeoutId);
    setTimeoutId(window.setTimeout(async () => {
      if (!value.length) {
        setNames([]);
        return;
      };
      const fetchedNames = await fetchNames(value.toLowerCase());
      const mappedNames = fetchedNames.map((name, i) => ({ value: name, label: getNameItemRender(name, value), key: i }))
      setNames(mappedNames);
    }, 500));
  }

  const getNameItemRender = (name: string, substr: string) => {
    const start = name.toLowerCase().indexOf(substr.toLowerCase());
    if (start === -1) return <span>{name}</span>
    return (
      <span>
        {name.slice(0, start)}
        <span style={{ color: 'blue' }} >{name.slice(start, start + substr.length)}</span>
        {name.slice(start + substr.length, name.length)}
      </span>
    )
  }

  const onSelectName = (value: SelectNameItemI) => {
    setOptions({ ...options, name: value.value });
  } 

  const onClearName = () => {
    setOptions({ ...options, name: undefined });
    setNames([]);
  }

  const onGenderSelect = (e: RadioChangeEvent) => {
    setOptions({ ...options, gender: e.target.value })
  }

  const onStatusSelect = (e: RadioChangeEvent) => {
    setOptions({ ...options, status: e.target.value })
  }

  return (
    <div className="characters-filter-wrapper">
      <div className="name-filter filter-item">
        <Select
          labelInValue
          showSearch
          allowClear
          placeholder="Character's name"
          onClear={onClearName}
          onSearch={onNameSearch}
          options={names}
          style={{ width: 220 }}
          onSelect={onSelectName}
          optionLabelProp='value'
        />
      </div>
      <div className='gender-fiter filter-item'>
        <Radio.Group value={options?.gender} onChange={onGenderSelect} buttonStyle='solid'>
          <Radio.Button value='female'>Female</Radio.Button>
          <Radio.Button value='male'>Male</Radio.Button>
          <Radio.Button value='genderless'>Genderless</Radio.Button>
          <Radio.Button value='unknown'>Unknown</Radio.Button>
          <Radio.Button value={undefined}>Unset</Radio.Button>
        </Radio.Group>
      </div>
      <div className='gender-fiter filter-item'>
        <Radio.Group value={options?.status} onChange={onStatusSelect} buttonStyle='solid'>
          <Radio.Button value='alive'>Alive</Radio.Button>
          <Radio.Button value='dead'>Dead</Radio.Button>
          <Radio.Button value='unknown'>Unknown</Radio.Button>
          <Radio.Button value={undefined}>Unset</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default CharactersFilter;