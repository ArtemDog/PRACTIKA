import { useState } from 'react';
import { 
  SplitLayout, 
  SplitCol, 
  View, 
  Panel, 
  PanelHeader,
  usePlatform
} from '@vkontakte/vkui';
import { Form } from './components/Form';
import { ResumeView } from './components/ResumeView';
import type { FormData } from './components/Form';

export default function App() {
  const [resumeData, setResumeData] = useState<FormData | null>(null);
  const [activePanel] = useState('main');
  const platform = usePlatform();

  const handleFormSubmit = (data: FormData) => {
    setResumeData(data);
  };

  const handleReset = () => {
    setResumeData(null);
  };

  return (
    <SplitLayout 
      header={platform !== 'vkcom' ? <PanelHeader /> : null}
      style={{
        '--vkui_internal--panel_header_height': '0px'
      } as React.CSSProperties}
    >
      <SplitCol autoSpaced>
        <View activePanel={activePanel}>
          <Panel id="main">
            <PanelHeader>Конструктор резюме</PanelHeader>
            {!resumeData ? (
              <Form onSubmit={handleFormSubmit} />
            ) : (
              <ResumeView 
                data={resumeData} 
                onEdit={handleReset}  // Теперь типы совпадают
              />
            )}
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}