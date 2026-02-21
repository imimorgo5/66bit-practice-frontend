export const GENDER_OPTIONS = [
  { value: 'Male', label: 'Мужчина' },
  { value: 'Female', label: 'Женщина' }
];

export const POSITION_OPTIONS = [
  { value: 'Frontend', label: 'Frontend-разработчик' },
  { value: 'Backend', label: 'Backend-разработчик' },
  { value: 'Analyst', label: 'Аналитик' },
  { value: 'Manager', label: 'Менеджер' },
  { value: 'Designer', label: 'Дизайнер' }
];

export const STACK_OPTIONS = [
  { value: 'CSharp', label: 'C#' },
  { value: 'React', label: 'React' },
  { value: 'Java', label: 'Java' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Figma', label: 'Figma' },
  { value: 'Word', label: 'Word' }
];

export const ALL_OPTIONS_MAP = [
  ...GENDER_OPTIONS,
  ...POSITION_OPTIONS,
  ...STACK_OPTIONS
].reduce((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});