import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FileContentTypeEnum } from '../../../common/enums/file-content-type.enum';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/IUserData';
import { AuthService } from '../../auth/services/auth.service';
import { AuthAccessService } from '../../auth/services/auth-access.service';
import { AwsStorageService } from '../../aws-storage/services/aws-storage.service';
import { UserRepository } from '../../repository/services/user_repository.service';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserPresenterService } from './user-presenter.service';

@Injectable()
// @Injectable() you're declaring that this class can be managed by the NestJS IoC
// (Inversion of Control) container. This allows NestJS to handle the lifecycle of
// the class and inject it wherever it's needed.
export class UsersService {
  constructor(
    /*Integration of methods/services from sabling modules*/
    // public readonly postService: PostsService,
    public readonly userRepository: UserRepository,
    public readonly authAccessService: AuthAccessService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly awsStorageService: AwsStorageService,
    private readonly userPresenter: UserPresenterService,
  ) {}

  // ToDo
  public async findAll(): Promise<any> {
    return `This action returns all users`;
  }

  public async findMe(UserData: IUserData): Promise<UserResDto> {
    const userFound = await this.userRepository.findOneBy({
      id: UserData.userId,
    });
    return this.userPresenter.toResponseDto(userFound);
  }

  public async updateMe(
    UserData: IUserData,
    // ToDo
    updateUserDto: any,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: UserData.userId });
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  public async removeMe(userData: IUserData): Promise<void> {
    await this.userRepository.delete({ id: userData.userId });
    // not needed because in entity onDelete:'CASCADE' option used
    // await this.authService.signOut(userData);
    await this.authAccessService.deleteToken(
      userData.userId,
      userData.deviceId,
    );
  }

  public async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  public async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('User already exists');
    }
  }

  public async uploadAvatar(
    { userId }: IUserData,
    avatar: Express.Multer.File,
  ): Promise<void> {
    const avatarPath = await this.awsStorageService.uploadFile(
      avatar,
      FileContentTypeEnum.AVATAR,
      userId,
    );
    await this.userRepository.update(userId, { avatar_image: avatarPath });
  }

  public async deleteAvatar({ userId }: IUserData): Promise<void> {
    const filePath = (await this.userRepository.findOneBy({ id: userId }))
      .avatar_image;
    await this.awsStorageService.deleteFile(filePath);
    await this.userRepository.update(userId, { avatar_image: null });
  }
}
