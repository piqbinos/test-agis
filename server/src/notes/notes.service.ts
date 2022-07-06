import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Note } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto, UpdateNoteDto } from './dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async createNote(dto: CreateNoteDto): Promise<Note> {
    try {
      const newNote = await this.prisma.note.create({ data: dto });
      return newNote;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNotes(): Promise<Note[]> {
    try {
      const notes = await this.prisma.note.findMany();
      return notes;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteNote(id: string): Promise<void> {
    try {
      const existsNote = await this.prisma.note.findUnique({ where: { id } });
      if (!existsNote) {
        throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
      }
      await this.prisma.note.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateNote(dto: UpdateNoteDto): Promise<Note> {
    try {
      const existsNote = await this.prisma.note.findUnique({
        where: { id: dto.id },
      });
      if (!existsNote) {
        throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
      }
      const updatedNote = await this.prisma.note.update({
        where: { id: dto.id },
        data: {
          text: dto.text,
        },
      });
      return updatedNote;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
