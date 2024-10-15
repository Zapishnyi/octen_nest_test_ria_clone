import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import {
  AdminConfigType,
  AppConfigType,
  EnvConfigType,
} from '../../../configs/envConfigType';
import { UserEntity } from '../../../database/entities/user.entity';
import { EmailTypeEnum } from '../../mailer/enums/email-type.enum';
import { MailService } from '../../mailer/services/mail.service';
import { RefreshTokenRepository } from '../../repository/services/refresh-token-repository.service';
import { UserRepository } from '../../repository/services/user-repository.service';
import { UserCreateByAdminReqDto } from '../../users/dto/req/user-create-by-admin.req.dto';
import { UsersService } from '../../users/services/users.service';
import { UserSingInReqDto } from '../dto/req/user-sing-in.req.dto';
import { UserSingUpReqDto } from '../dto/req/user-sing-up.req.dto';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { IUserData } from '../interfaces/IUserData';
import { AuthAccessService } from './auth-access.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly refreshRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly authAccessService: AuthAccessService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly envConfig: ConfigService<EnvConfigType>,
    private readonly mailService: MailService,
  ) {}

  private async generateSaveTokens(
    user_id: string,
    device: string,
  ): Promise<TokenPairResDto> {
    const tokens = await this.tokenService.generateAuthTokens({
      user_id,
      device,
    });
    await Promise.all([
      this.refreshRepository.save({
        device,
        refresh: tokens.refresh,
        user_id,
      }),
      this.authAccessService.saveToken(tokens.access, user_id, device),
    ]);
    return tokens;
  }

  private async deleteTokens(user_id: string, device: string) {
    // delete previously issued refresh and access Tokens
    await Promise.all([
      this.refreshRepository.delete({
        device,
        user_id,
      }),
      this.authAccessService.deleteToken(user_id, device),
    ]);
  }

  public async singUp(
    dto: UserSingUpReqDto,
    request: Request,
  ): Promise<[UserEntity, TokenPairResDto]> {
    // Check if user exist
    await this.userService.isEmailExistOrThrow(dto.email);
    const device = request.headers['user-agent'];
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    const tokens = await this.generateSaveTokens(user.id, device);
    return [user, tokens];
  }

  public async singIn(
    dto: UserSingInReqDto,
    request: Request,
  ): Promise<[UserEntity, TokenPairResDto]> {
    // Is user exist?
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
        phone: true,
        role: true,
        plan: true,
        avatar_image: true,
        created: true,
        updated: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    // Is password valid?
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const device = request.headers['user-agent'];
    // delete previously issued refresh and access Tokens
    await this.deleteTokens(user.id, device);
    const tokens = await this.generateSaveTokens(user.id, device);
    return [user, tokens];
  }

  public async refresh({ user, device }: IUserData): Promise<TokenPairResDto> {
    await this.deleteTokens(user.id, device);
    return await this.generateSaveTokens(user.id, device);
  }

  public async signOut({ user, device }: IUserData) {
    await this.deleteTokens(user.id, device);
  }

  public async adminCreate(): Promise<void> {
    const dto = plainToInstance(
      UserCreateByAdminReqDto,
      this.envConfig.get<AdminConfigType>('admin'),
    );
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new NotAcceptableException([
        'Administrator data is not valid as mentioned below:',
        ...errors.map((error) => Object.values(error.constraints)).flat(),
      ]);
    }
    try {
      if (
        !(await this.userRepository.findOneBy({
          email: dto.email,
        }))
      ) {
        // Admin account create
        await this.userRepository.save(
          this.userRepository.create({
            ...dto,
            password: await bcrypt.hash(dto.password, 10),
          }),
        );
        Logger.log('Administrator account created');
      } else {
        Logger.log('Administrator account exist');
      }
      const { port, host } = this.envConfig.get<AppConfigType>('app');
      await this.mailService.sendMail(EmailTypeEnum.ADMIN_GREETING, dto.email, {
        first_name: dto.first_name,
        last_name: dto.last_name,
        api_docs_url: `http://${host}:${port}/api-docs`,
      });
    } catch (err) {
      Logger.log('Administrator account creation error', err);
    }
  }
}
