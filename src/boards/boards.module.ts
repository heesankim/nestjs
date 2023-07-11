import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';


/**
 * @Module() 데코레이터는 NestJS에서 모듈을 정의할 때 사용하는 데코레이터입니다.
 * 모듈은 기능별로 구분되어 있으며, 각각의 모듈은 하나의 기능을 담당합니다.
 * 예를 들어, 게시판 기능을 담당하는 BoardsModule, 회원 기능을 담당하는 UsersModule 등이 있습니다.
 * 의존성 주입을 위해 @Module() 데코레이터에 providers 프로퍼티를 추가합니다.
 */
@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
