import KPIWidget from './KPIWidget';
import PieWidget from './PieWidget';

interface WidgetMixerProps {
  type: string;
}

function WidgetMixer({ type }: WidgetMixerProps) {
  switch (type) {
    case 'KPI':
      return <KPIWidget/>;
    case 'PIE':
      return <PieWidget/>;
    case 'C':
      return <KPIWidget/>;
    default:
      return <div>Unknown widget type</div>;
  }
};

export default WidgetMixer;