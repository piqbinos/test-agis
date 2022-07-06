import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Note } from '@prisma/client';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  createNote(@Body() dto: CreateNoteDto): Promise<Note> {
    return this.notesService.createNote(dto);
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  getNotes(): Promise<Note[]> {
    return this.notesService.getNotes();
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  updateNote(@Body() dto: UpdateNoteDto): Promise<Note> {
    return this.notesService.updateNote(dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  deleteNote(@Param('id') id: string): Promise<void> {
    return this.notesService.deleteNote(id);
  }
}
