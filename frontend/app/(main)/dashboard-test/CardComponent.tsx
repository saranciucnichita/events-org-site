import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Divider, 
  Stack 
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Place as PlaceIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

// Определение типов для статуса события
type EventStatus = 'draft' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

interface EventCardProps {
  category: string;
  town: string;
  name: string;
  startTime: string; // Формат ISO или форматированная строка
  duration: string;  // Например, "2 часа", "3 дня"
  status: EventStatus;
  estimatedBudget: number;
}

// Хелпер для настройки цвета и текста тега статуса
const getStatusConfig = (status: EventStatus) => {
  const configs: Record<EventStatus, { label: string; color: 'default' | 'primary' | 'success' | 'warning' | 'error' }> = {
    draft: { label: 'Черновик', color: 'default' },
    confirmed: { label: 'Подтверждено', color: 'primary' },
    in_progress: { label: 'В процессе', color: 'warning' },
    completed: { label: 'Завершено', color: 'success' },
    cancelled: { label: 'Отменено', color: 'error' },
  };
  return configs[status];
};

export const EventOrganizationCard: React.FC<EventCardProps> = ({
  category,
  town,
  name,
  startTime,
  duration,
  status,
  estimatedBudget,
}) => {
  const statusConfig = getStatusConfig(status);

  return (
    <Card 
      elevation={2} 
      sx={{ 
        maxWidth: 400, 
        borderRadius: 3,
        transition: 'transform 0.3s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: 4,
        },
      }}
      className='mx-7'
    >
      <CardContent sx={{ p: 3 }}>
        {/* Верхняя строка: Категория и Статус */}
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}} className="mb-2">
          <Chip 
            icon={<CategoryIcon sx={{ fontSize: '1rem !important' }} />} 
            label={category} 
            variant="outlined" 
            size="small"
            sx={{ borderRadius: 1.5, fontWeight: 500 }}
          />
          <Chip 
            label={statusConfig.label} 
            color={statusConfig.color} 
            size="small"
            sx={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.65rem' }}
          />
        </Box>

        {/* Название события */}
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom 
          sx={{ fontWeight: 700, lineHeight: 1.3, mb: 2 }}
        >
          {name}
        </Typography>

        {/* Детали события */}
        <Stack sx={{ spacing: '1.5' }} className='my-2.5'>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1}}>
            <PlaceIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Город: <Box component="span" sx={{fontWeight: '600', color: "text.primary"}}>{town}</Box>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1}}>
            <CalendarIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Начало: <Box component="span" color="text.primary">{startTime}</Box>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1}}>
            <TimeIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Длительность: <Box component="span" color="text.primary">{duration}</Box>
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

        {/* Нижняя часть: Бюджет */}
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5}}>
            <MoneyIcon color="primary" fontSize="small" />
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: '500'}}>
              Планируемый бюджет
            </Typography>
          </Box>
          <Typography variant="subtitle1" component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>
            ${estimatedBudget.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Пример использования компонента:
// <EventOrganizationCard 
//   category="Конференция"
//   town="Кишинёв"
//   name="Tech Motivation Summit 2026"
//   startTime="25 Октября 2026, 10:00"
//   duration="8 часов"
//   status="confirmed"
//   estimatedBudget={15000}
// />