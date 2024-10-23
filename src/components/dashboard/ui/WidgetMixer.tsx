import BarWidget from './BarWidget';
import KPIWidget from './KPIWidget';
import PieWidget from './PieWidget';

interface WidgetMixerProps {
    type: string;
    index: number;
    updateRow: (index: number, newValue: string) => void;
}

function WidgetMixer({ type, index, updateRow }: WidgetMixerProps) {
    switch (type) {
        case 'KPI':
            return <KPIWidget currentIndex={index} removeWidget={updateRow} />;
        case 'PIE':
            return <PieWidget currentIndex={index} removeWidget={updateRow} />;
        case 'BAR':
            return <BarWidget currentIndex={index} removeWidget={updateRow} />;
        default:
            return null;
    }
};

export default WidgetMixer;