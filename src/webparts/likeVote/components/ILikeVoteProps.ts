export interface ILikeVoteProps {
  description: string;
  likedefault: boolean;
  currentPageTitle: string;
  user: string;
}

export interface ILikeVoteState {
  isLikedByUser: boolean;
}
