import { observer } from 'mobx-react-lite';
import { useAppService } from 'services';
import { Skills, Openers } from 'services/classes/gnb';
import { Skill } from 'services/models/Skill';
import CurrentIndicator from 'shared/currentIndicator';
import SkillIcon from 'shared/skillIcon';
import LockedInstructions from './LockedInstructions';

function App() {
  const app = useAppService();

  if (!app.gameActive || !app.gameExists) {
    return null;
  }

  if (!app.overlayLocked) {
    return (<LockedInstructions></LockedInstructions>);
  }

  var gnbOpener = Openers[0];
  var skillsById = new Map<string, Skill>();
  Skills.forEach(sk => skillsById.set(sk.id, new Skill(sk)));

  return (
    <div>
      <div style={{ position: 'absolute', top: 30, right: 'auto' }}>
        <CurrentIndicator xPos={0} yPos={0} />
      </div>
      {gnbOpener.sequenceIds.map((id, index) => (
        <SkillIcon key={index} skill={skillsById.get(id)!} draggable />
      ))}
    </div>
  );
}

export default observer(App);
