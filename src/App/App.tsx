import { observer } from 'mobx-react-lite';
import { useAppService, usePlayerService } from 'services';
import ConfigureSkills from './ConfigureSkills';
import LockedInstructions from './LockedInstructions';

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


  return (
    <div>
      Rotation
    </div>
  );
}

export default observer(App);
