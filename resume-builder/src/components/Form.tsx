import { 
  Button, 
  FormItem, 
  Input, 
  File, 
  Textarea, 
  Select,
  Group,
  Header,
  Separator,
  Text
} from '@vkontakte/vkui';
import { useState } from 'react';

export interface FormData {
  name: string;
  photo: File | null;
  email: string;
  phone: string;
  education: {
    institution: string;
    degree: string;
    year: string;
  };
  experience: {
    id: string;
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  skills: string[];
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const degrees = [
  { label: 'Среднее образование', value: 'secondary' },
  { label: 'Бакалавр', value: 'bachelor' },
  { label: 'Магистр', value: 'master' },
  { label: 'Кандидат наук', value: 'phd' },
];

export const Form = ({ onSubmit }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    photo: null,
    email: '',
    phone: '',
    education: {
      institution: '',
      degree: 'bachelor',
      year: ''
    },
    experience: [{ 
      id: Date.now().toString(), 
      company: '', 
      position: '', 
      period: '', 
      description: '' 
    }],
    skills: []
  });

  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    name: false
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      email: !validateEmail(formData.email),
      name: formData.name.trim() === ''
    };
    
    setErrors(newErrors);
    
    if (!newErrors.email && !newErrors.name) {
      onSubmit(formData);
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { 
          id: Date.now().toString(), 
          company: '', 
          position: '', 
          period: '', 
          description: '' 
        }
      ]
    });
  };

  const removeExperience = (id: string) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter(exp => exp.id !== id)
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group mode="card" header={<Header>Основная информация</Header>}>
        <FormItem 
          top="Имя и фамилия*"
          status={errors.name ? 'error' : undefined}
          bottom={errors.name ? 'Поле обязательно для заполнения' : undefined}
        >
          <Input 
            value={formData.name}
            onChange={(e) => {
              setFormData({...formData, name: e.target.value});
              setErrors({...errors, name: false});
            }}
            required
          />
        </FormItem>

        <FormItem top="Фото профиля">
          <File 
            accept="image/*"
            onChange={(e) => setFormData({
              ...formData, 
              photo: e.target.files?.[0] || null
            })}
          />
        </FormItem>

        <FormItem 
          top="Email*"
          status={errors.email ? 'error' : undefined}
          bottom={errors.email ? 'Введите корректный email' : undefined}
        >
          <Input 
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({...formData, email: e.target.value});
              setErrors({...errors, email: false});
            }}
          />
        </FormItem>

        <FormItem top="Телефон">
          <Input 
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({
              ...formData, 
              phone: e.target.value
            })}
            placeholder="+7 (XXX) XXX-XX-XX"
          />
        </FormItem>
      </Group>

      <Separator />

      <Group mode="card" header={<Header>Образование</Header>}>
        <FormItem top="Учебное заведение">
          <Input 
            value={formData.education.institution}
            onChange={(e) => setFormData({
              ...formData,
              education: {
                ...formData.education,
                institution: e.target.value
              }
            })}
          />
        </FormItem>
        
        <FormItem top="Степень">
          <Select
            options={degrees}
            value={formData.education.degree}
            onChange={(e) => {
              const target = e.target as HTMLSelectElement;
              setFormData({
                ...formData,
                education: {
                  ...formData.education,
                  degree: target.value
                }
              });
            }}
          />
        </FormItem>
        
        <FormItem top="Год окончания">
          <Input 
            value={formData.education.year}
            onChange={(e) => setFormData({
              ...formData,
              education: {
                ...formData.education,
                year: e.target.value
              }
            })}
            placeholder="ГГГГ"
          />
        </FormItem>
      </Group>

      <Separator />

      <Group mode="card" header={<Header>Опыт работы</Header>}>
        {formData.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: 16 }}>
            <FormItem top="Компания">
              <Input
                value={exp.company}
                onChange={(e) => {
                  const newExperience = [...formData.experience];
                  const index = newExperience.findIndex(e => e.id === exp.id);
                  newExperience[index].company = e.target.value;
                  setFormData({ ...formData, experience: newExperience });
                }}
              />
            </FormItem>
            
            <FormItem top="Должность">
              <Input
                value={exp.position}
                onChange={(e) => {
                  const newExperience = [...formData.experience];
                  const index = newExperience.findIndex(e => e.id === exp.id);
                  newExperience[index].position = e.target.value;
                  setFormData({ ...formData, experience: newExperience });
                }}
              />
            </FormItem>
            
            <FormItem top="Период работы">
              <Input
                value={exp.period}
                onChange={(e) => {
                  const newExperience = [...formData.experience];
                  const index = newExperience.findIndex(e => e.id === exp.id);
                  newExperience[index].period = e.target.value;
                  setFormData({ ...formData, experience: newExperience });
                }}
                placeholder="ММ.ГГГГ - ММ.ГГГГ"
              />
            </FormItem>
            
            <FormItem top="Обязанности и достижения">
              <Textarea
                value={exp.description}
                onChange={(e) => {
                  const newExperience = [...formData.experience];
                  const index = newExperience.findIndex(e => e.id === exp.id);
                  newExperience[index].description = e.target.value;
                  setFormData({ ...formData, experience: newExperience });
                }}
              />
            </FormItem>
            
            {formData.experience.length > 1 && (
              <Button 
                mode="tertiary" 
                appearance="negative"
                onClick={() => removeExperience(exp.id)}
                style={{ marginTop: 8 }}
              >
                Удалить место работы
              </Button>
            )}
            
            <Separator />
          </div>
        ))}
        
        <Button 
          mode="secondary" 
          onClick={addExperience}
          stretched
        >
          Добавить место работы
        </Button>
      </Group>

      <Separator />

      <Group mode="card" header={<Header>Навыки</Header>}>
        <FormItem>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Введите навык"
              style={{ flexGrow: 1 }}
            />
            <Button onClick={addSkill}>Добавить</Button>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {formData.skills.map((skill, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--button_secondary_background)',
                  borderRadius: 20,
                  padding: '4px 12px'
                }}
              >
                <Text>{skill}</Text>
                <Button 
                  mode="tertiary"
                  appearance="negative"
                  onClick={() => removeSkill(index)}
                  size="s"
                  style={{ marginLeft: 8 }}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </FormItem>
      </Group>

      <FormItem>
        <Button 
          type="submit" 
          size="l" 
          stretched
          mode="primary"
          style={{ marginTop: 24 }}
        >
          Создать резюме
        </Button>
      </FormItem>
    </form>
  );
};