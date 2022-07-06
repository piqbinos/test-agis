import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  id: string;
}
