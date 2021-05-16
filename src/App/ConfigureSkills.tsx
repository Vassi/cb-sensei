import { observer } from 'mobx-react-lite';
import { JobConfig } from "services/models/JobConfig";
import SkillIcon from 'shared/skillIcon';
import styles from './ConfigureSkills.module.scss';

type Props = {
  config: JobConfig
};

function ConfigureSkills({ config }: Props) {
  const skills = config.skills.map(sk => {
    return (<SkillIcon key={sk.skill.id} skillTuple={sk} draggable />)
  });

  const savePos = () => {
    const saves: Promise<void>[] = [];
    config.skills.forEach(tuple => {
      saves.push(tuple.metadata.save());
      Promise.all(saves).then(() => {
        config.setSkillsConfigured(true);
      });
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.instructions}>
        <h1>Configure Skill Placement:</h1>
        <p>Drag the skill icons over their corresponding skill on your hotbars then click 'save'.</p>
        <p><em>Some skills will not be relevant (like Eureka skills) you can simply not drag them.</em></p>
        <p>Once you are happy with this position, <strong>Lock</strong> the overlay but do not mark it as click-through until you have finished the
          configuration steps for your Job(s)
        </p>
        <button type="button" onClick={savePos}>Save Positions and Continue</button>
      </div>
      <div>
        {skills}
      </div>
    </div>
  );
}

export default observer(ConfigureSkills);
