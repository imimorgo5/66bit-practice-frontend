const MONTHS_MAP = {
  'января': '01', 'февраля': '02', 'марта': '03', 'апреля': '04',
  'мая': '05', 'июня': '06', 'июля': '07', 'августа': '08',
  'сентября': '09', 'октября': '10', 'ноября': '11', 'декабря': '12'
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const parts = dateString.trim().split(' ');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = MONTHS_MAP[parts[1].toLowerCase()] || '01';
    const year = parts[2];
    return `${day}.${month}.${year}`;
  }
  
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  return dateString;
};

export const formatPhone = (phoneString) => {
  if (!phoneString) return '';
  return phoneString.replace(/\(/g, '').replace(/\)/g, '');
};