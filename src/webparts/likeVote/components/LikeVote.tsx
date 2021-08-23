import * as React from 'react';
import styles from './LikeVote.module.scss';
import { ILikeVoteProps } from './ILikeVoteProps';
import { IconButton } from 'office-ui-fabric-react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files/web";
import "@pnp/sp/comments/clientside-page";
import "@pnp/sp/comments/item";
import "@pnp/sp/items";
import { ILikedByInformation } from "@pnp/sp/comments";
import { IClientsidePage } from '@pnp/sp/clientside-pages';
import { IItem } from '@pnp/sp/items';

export default function LikeVote(props: ILikeVoteProps) {

  const pageUrl: string = "/sites/Judging/sitepages/Submission24.aspx";
  const [like, setLike] = React.useState(true);
  function _likeClicked() {
    setLike(!like);
  }

  React.useEffect(
    () => {

      const getLikeInfoPage = async () => {
        const page: IClientsidePage = await sp.web.loadClientsidePage(pageUrl);
        const likedByInfoPage: ILikedByInformation = await page.getLikedByInformation();
        console.log("likedByInfoPage");
        console.log(likedByInfoPage);

      };
      const getLikeInfoItem = async () => {
        const item: IItem = await sp.web.getFileByServerRelativeUrl(pageUrl).getItem();
        //const item: IItem = await sp.web.lists.getByTitle("Site Pages").items.getById(38).get();
        const likedByInfoItem: ILikedByInformation = await item.getLikedByInformation();
        console.log("likedByInfoItem");
        console.log(likedByInfoItem);

      };
      getLikeInfoPage();
      getLikeInfoItem();

    }, []
  );
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
