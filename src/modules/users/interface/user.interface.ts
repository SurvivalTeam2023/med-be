import { FileDTO } from "src/modules/files/dto/file.dto";

export interface IUser {
  id: number;

  firstName?: null | string;

  lastName?: string;

  isActive: boolean;

  avatar?: FileDTO;
}
