import { 
  Button, 
  Group, 
  Header, 
  Div, 
  Card, 
  CardGrid,
  Avatar,
  Text,
  SimpleCell
} from '@vkontakte/vkui';
import type { FormData } from './Form';

interface ResumeViewProps {
  data: FormData;
  onEdit: () => void;
}

const getDegreeLabel = (value: string) => {
  const degrees = [
    { label: 'Среднее', value: 'secondary' },
    { label: 'Бакалавр', value: 'bachelor' },
    { label: 'Магистр', value: 'master' },
    { label: 'Кандидат наук', value: 'phd' },
  ];
  return degrees.find(d => d.value === value)?.label || value;
};

export const ResumeView = ({ data, onEdit }: ResumeViewProps) => {
  return (
    <Group>
      {/* Блок с основной информацией */}
      <Group 
        mode="card" 
        header={<Header>Основная информация</Header>} // Убрали mode="secondary"
      >
        <SimpleCell
          before={
            data.photo && (
              <Avatar 
                src={URL.createObjectURL(data.photo)} 
                size={72}
              />
            )
          }
        >
          <Text weight="2">{data.name}</Text>
          <Text weight="3" className="textSecondary">{data.email}</Text>
          {data.phone && (
            <Text weight="3" className="textSecondary">{data.phone}</Text>
          )}
        </SimpleCell>
      </Group>

      {/* Блок образования */}
      <Group mode="card" header={<Header>Образование</Header>}>
        <Div>
          <Text weight="2">{data.education.institution}</Text>
          <div className="textSecondary">
            <Text>{getDegreeLabel(data.education.degree)}</Text>
            {data.education.year && <Text>, {data.education.year}</Text>}
          </div>
        </Div>
      </Group>

      {/* Блок опыта работы */}
      {data.experience.length > 0 && (
        <Group mode="card" header={<Header>Опыт работы</Header>}>
          <CardGrid size="l">
            {data.experience.map((exp) => (
              <Card key={exp.id} mode="outline">
                <Div>
                  <Text weight="2">{exp.company}</Text>
                  <div className="textSecondary">
                    <Text>{exp.position}</Text>
                    {exp.period && <Text>, {exp.period}</Text>}
                  </div>
                  {exp.description && (
                    <Text className="textSecondary" style={{ marginTop: 8 }}>
                      {exp.description}
                    </Text>
                  )}
                </Div>
              </Card>
            ))}
          </CardGrid>
        </Group>
      )}

      {/* Блок навыков */}
      {data.skills.length > 0 && (
        <Group mode="card" header={<Header>Навыки</Header>}>
          <Div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {data.skills.map((skill, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: 'var(--button_secondary_background)',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 14,
                    color: 'var(--text_primary)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Div>
        </Group>
      )}

      {/* Кнопка редактирования */}
      <Div>
        <Button 
          size="l" 
          stretched
          mode="secondary"
          onClick={onEdit}
        >
          Редактировать резюме
        </Button>
      </Div>
    </Group>
  );
};