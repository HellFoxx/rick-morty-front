import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { CharacterI } from '../../../types';
import './CharacterItem.scss';

interface CharacterItemI extends CharacterI {
  loading?: boolean;
}

const CharacterItem = (props: CharacterItemI) => {
  const { image, name, status, gender, loading, id } = props;

  return (
    <Link to={`/character/${id}`}>
      <Card
        hoverable
        cover={<img alt='example' src={image} />}
        loading={loading}
        className='card'
      >
        <Meta title={name} description={`${gender} - ${status}`}/>
      </Card>
    </Link>
  );
};

export default CharacterItem;
