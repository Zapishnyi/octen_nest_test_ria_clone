import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AdminRoleGuard } from '../../../common/guards/admin-role.guard';
import { JwtAccessGuard } from '../../../common/guards/jwt-access.guard';
import { UserSelfCreateReqDto } from '../dto/req/user-self-create.req.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserPresenterService } from '../services/user-presenter.service';
import { UsersService } from '../services/users.service';

@ApiTags('2.Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userPresenter: UserPresenterService,
  ) {}

  @ApiBearerAuth()
  @Post('user-create')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  public async createUser(
    @Body() dto: UserSelfCreateReqDto,
  ): Promise<UserResDto> {
    return this.userPresenter.toResponseDto(
      await this.usersService.createUser(dto),
    );
  }
}
