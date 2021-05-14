import Draggable from 'react-draggable';
import { Skill } from 'services/models/Skill';
import styles from './skillIcon.module.scss';

type SkillIconArgs = {
  key?: any,
  draggable?: boolean,
  skill: Skill,
}

export default function SkillIcon({ skill, draggable }: SkillIconArgs) {
  const imgSrc = process.env.PUBLIC_URL + '/Actions/' + skill.id + '.png';

  return (
    <Draggable handle={'.' + styles.icon} axis={draggable ? 'both' : 'none'}>
      <div className={styles.icon}>
        <img src={imgSrc} alt={skill.name}></img>
      </div>
    </Draggable>
  );
};