// Функция для расчета координат каждой точки на окружности
export const calculateDotPosition = (
  radius: number,
  index: number,
  total: number,
  angleOffset = 0,
) => {
  const angle = ((2 * Math.PI) / total) * index + angleOffset;
  const x = radius + radius * Math.cos(angle);
  const y = radius + radius * Math.sin(angle);

  return { x, y };
};
