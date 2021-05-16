import { observer } from 'mobx-react-lite';
import { useAppService, usePlayerService } from 'services';
import ConfigureSkills from './ConfigureSkills';
import LockedInstructions from './LockedInstructions';
import CurrentIndicator from 'shared/CurrentIndicator';

function App() {
  const app = useAppService();
  const player = usePlayerService();

  if (!app.overlayActive || !player.playerReady) {
    return null;
  }

  if (!app.overlayLocked) {
    return (<LockedInstructions></LockedInstructions>);
  }

  if (!player.jobConfig!.skillsConfigured) {
    return (<ConfigureSkills config={player.jobConfig!} />);
  }

  const skills = player.jobConfig!.skills.map(sk => {
    return (<CurrentIndicator key={sk.skill.id} skillTuple={sk} />)
  });

  return (
    <div>
      {skills}
    </div>
  );
}

export default observer(App);
