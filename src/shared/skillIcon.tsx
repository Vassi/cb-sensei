import { observer } from 'mobx-react-lite';
import { createRef } from 'react';
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable';
import { SkillTuple } from 'services/models/JobConfig';
import styles from './skillIcon.module.scss';

type SkillIconArgs = {
  draggable?: boolean,
  skillTuple: SkillTuple,
}

function SkillIcon({ skillTuple, draggable }: SkillIconArgs) {
  const imgSrc = process.env.PUBLIC_URL + '/Actions/' + skillTuple.skill.id + '.png';
  const nodeRef = createRef<HTMLDivElement>();

  const defaultPosition = skillTuple.metadata.posX === 0 && skillTuple.metadata.posY === 0
    ? undefined
    : { x: skillTuple.metadata.posX, y: skillTuple.metadata.posY };

  const updatePosition: DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {
    const position = data.node.getBoundingClientRect()
    skillTuple.metadata.posX = position.left;
    skillTuple.metadata.posY = position.top;
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

export default observer(SkillIcon);