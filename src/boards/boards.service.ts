import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.model';
import { BoardStatus } from './board.model';
import { randomBytes } from 'crypto';
import { CreateBoardDto } from './dto/create-board.dto';

/**
 * @Injectable() 데코레이터는 NestJS에서 서비스를 정의할 때 사용하는 데코레이터입니다.
 * 서비스는 비즈니스 로직을 처리하는 역할을 합니다.
 * 예를 들어, 게시판을 생성하는 기능, 게시판의 목록을 조회하는 기능 등이 있습니다.
 * 의존성 주입을 위해 @Injectable() 데코레이터에 providers 프로퍼티를 추가합니다.
 * providers 프로퍼티에는 서비스를 등록합니다.
 * 서비스는 클래스로 정의하며, 클래스에 @Injectable() 데코레이터를 추가합니다.
 * 이렇게 하면 NestJS가 해당 클래스를 서비스로 인식합니다.
 */
@Injectable()
export class BoardsService {
  // private을 사용하지 않으면 다른 컴포넌트에서 boards에 접근하는 것을 차단하기 위해서
  private boards: Board[] = [];

  private generateUUID(): string {
    return randomBytes(16).toString('hex');
  }

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const newBoard: Board = {
      id: this.generateUUID(), // 랜덤한 16진수 문자열을 생성
      title,
      description,
      status: BoardStatus.PUBLIC, // 처음은 공개글로 설정
    };
    console.log(newBoard);
    this.boards.push(newBoard);

    return newBoard;
  }
  getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id);
    if (!board) {
      throw new NotFoundException(
        `게시판 ID '${id}'에 해당하는 게시판을 찾을 수 없습니다.`,
      );
    }
    return board;
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    if (!board) {
      throw new NotFoundException(
        `게시판 ID '${id}'에 해당하는 게시판을 찾을 수 없습니다.`,
      );
    }
    board.status = status;
    return board;
  }
}
