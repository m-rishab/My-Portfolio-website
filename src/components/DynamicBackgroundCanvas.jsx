import { useTheme } from '../context/ThemeContext';
import CursorReactiveCanvas from './CursorReactiveCanvas';
import NeuralMeshCanvas from './NeuralMeshCanvas';
import CodeRainCanvas from './CodeRainCanvas';
import LightBackgroundCanvas from './LightBackgroundCanvas';

export default function DynamicBackgroundCanvas() {
  const { visualMode } = useTheme();

  return (
    <div className="fixed inset-0 -z-50 h-full w-full select-none overflow-hidden transition-opacity duration-700">
      {visualMode === 'neural' && <NeuralMeshCanvas />}
      {visualMode === 'coderain' && <CodeRainCanvas />}
      {visualMode === 'glow' && <LightBackgroundCanvas />}
      {visualMode === 'particles' && <CursorReactiveCanvas />}
    </div>
  );
}
