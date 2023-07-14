import { BaseEntity } from "src/common/base/base.entity";
import { AudioEntity } from "src/modules/audio/entities/audio.entity";
import { FileEntity } from "src/modules/files/entities/file.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('audio_file')
export class AudioFileEntity extends BaseEntity {

    @Column({ name: 'audio_id' })
    public audioId!: number;

    @Column({ name: 'file_id' })
    public fileId!: number;

    @Column({ name: 'is_primary' })
    public isPrimary: boolean;

    @ManyToOne(() => AudioEntity, (audio) => audio.audioFile)
    @JoinColumn({ name: 'audio_id' })
    public audio!: AudioEntity;

    @ManyToOne(() => FileEntity, (genre) => genre.audioFile)
    @JoinColumn({ name: 'file_id' })
    public file: FileEntity;
}