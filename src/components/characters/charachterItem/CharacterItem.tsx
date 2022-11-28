import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { CharacterI } from '../../../types';

interface CharacterItemI extends CharacterI {
  loading?: boolean;
}

const CharacterItem = (props: CharacterItemI) => {
  const { image, name, status, loading, id } = props;

  return (
    <Link to={`/character/${id}`}>
      <Card
        hoverable
        style={{ width: '20wv' }}
        cover={<img alt='example' src={image} style={{ width: '20wv' }} />}
        loading={loading}
      >
        <Meta title={name} description={status} />
      </Card>
    </Link>
  );
};

export default CharacterItem;
