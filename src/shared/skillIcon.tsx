import { createRef } from 'react';
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable';
import { SkillTuple } from 'services/models/JobConfig';
import styles from './skillIcon.module.scss';

type SkillIconArgs = {
  key?: any,
  draggable?: boolean,
  skillTuple: SkillTuple,
}

export default function SkillIcon({ skillTuple, draggable }: SkillIconArgs) {
  const imgSrc = process.env.PUBLIC_URL + '/Actions/' + skillTuple.skill.id + '.png';
  const nodeRef = createRef<HTMLDivElement>();

  const defaultPosition = skillTuple.metadata.posX === 0 && skillTuple.metadata.posY === 0
    ? undefined
    : { x: skillTuple.metadata.posX, y: skillTuple.metadata.posY };

  const updatePosition: DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
    skillTuple.metadata.posX = data.x;
    skillTuple.metadata.posY = data.y;
  };

  return (
    <Draggable
      handle={'.' + styles.icon}
      axis={draggable ? 'both' : 'none'}
      defaultPosition={defaultPosition}
      onStop={updatePosition}
      nodeRef={nodeRef}>
      <div ref={nodeRef} className={styles.icon}>
        <img src={imgSrc} alt={skillTuple.skill.name}></img>
      </div>
    </Draggable>
  );
};