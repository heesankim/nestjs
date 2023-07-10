/**
 * 게시판의 모델
 */
export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}
/**
 * 게시판의 상태를 나타냄
 */
export enum BoardStatus {
  PUBLIC = 'PUBLIC', // 공개글
  PRIVATE = 'PRIVATE', // 비공개글
  // 이 두가지 외 다른것을 넣으면 에러가 발생한다.
}

