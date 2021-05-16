import styles from './currentIndicator.module.scss';
import { useRotationService } from 'services';
import { SkillTuple } from 'services/models/JobConfig';
import { observer } from 'mobx-react-lite';

type Props = {
  skillTuple: SkillTuple,
};

function CurrentIndicator({ skillTuple }: Props) {
  const rotation = useRotationService();

  const isOgcd = rotation.pendingOgcds.find(sk => sk.id.toUpperCase() === skillTuple.skill.id.toUpperCase());
  //const isOgcd = rotation.previewPendingAction?.id.toUpperCase() === skillTuple.skill.id.toUpperCase();
  const isGcd = rotation.pendingAction?.id.toUpperCase() === skillTuple.skill.id.toUpperCase();

  if (!isOgcd && !isGcd) {
    return null;
  }

  const placement = {
    top: skillTuple.metadata.posY,
    left: skillTuple.metadata.posX
  };

  const classDefinition = styles.indicator + (isOgcd ? ' ' + styles.ogcd : '');

  return (
    <div className={classDefinition} style={placement}>
      <div></div>
      <div></div>
    </div>
  );
};

export default observer(CurrentIndicator);