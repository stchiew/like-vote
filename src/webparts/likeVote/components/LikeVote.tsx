import * as React from 'react';
import styles from './LikeVote.module.scss';
import { ILikeVoteProps } from './ILikeVoteProps';
import { IconButton } from '@fluentui/react';

export default function LikeVote(props: ILikeVoteProps) {

  const [like, setLike] = React.useState(true);
  function _likeClicked() {
    setLike(!like);
  }
  return (
    <div className={styles.likeVote}>
      <div className={styles.container}>
        <div className={styles.row}>
          <IconButton iconProps={{ iconName: like ? 'LikeSolid' : 'Like' }} title='Like'
            onClick={_likeClicked}
          />
          {like &&
            <div>You liked this!</div>}
        </div>
      </div>
    </div>
  );



}
