import {  Entity, JoinColumn, ManyToOne, } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import { SubcriptionEntity } from 'src/modules/subcription/entities/subcription.entity';

@Entity('access')
export class AccessEntity extends BaseEntity {

    @ManyToOne(() => SubcriptionEntity, (subcription) => subcription.access)
    @JoinColumn({ name: "subcription_id" })
    public subcriptionId: SubcriptionEntity;

  
    @ManyToOne(() => AudioEntity, (audio) => audio.access)
    @JoinColumn({ name: 'audio_id' })
    public audioId: AudioEntity;
}
