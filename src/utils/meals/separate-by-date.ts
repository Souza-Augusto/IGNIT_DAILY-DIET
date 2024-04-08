import { mealDTO, listMealDTO } from '@dtos/meal-dtos';

export function SeparateByDate(data: mealDTO[]): listMealDTO[] {
  const arrayseparate: listMealDTO[] = [];

  data.forEach((obj) => {
    const data = obj.date;
    const formattedobject = {
      id: obj.id,
      hour: obj.hour,
      date: obj.date,
      name: obj.name,
      healthy: obj.healthy,
      description: obj.description,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };

    const indexData = arrayseparate.findIndex((item) => item.title === data);

    if (indexData !== -1) {
      arrayseparate[indexData].data.push(formattedobject);
    } else {
      arrayseparate.push({
        title: data,
        data: [formattedobject],
      });
    }
  });

  const converttedDates = arrayseparate.map((item) => {
    const parts = item.title.split('/');
    const formattedTitle = Number(`${parts[2]}${parts[1]}${parts[0]}`);

    return {
      ...item,
      title: formattedTitle,
    };
  });

  const sortDatesDescending = converttedDates.sort((a, b) => {
    const dateA = a.title;
    const dateB = b.title;
    return dateB - dateA;
  });

  const sortHoursDescending = sortDatesDescending.map((item) => {
    const sortDatesDescending = item.data.sort((a, b) => {
      const hourA = a.hour.split(':');
      const hourB = b.hour.split(':');

      return (
        Number(hourB[0]) - Number(hourA[0]) ||
        Number(hourB[1]) - Number(hourA[1])
      );
    });
    return {
      title: item.title,
      data: sortDatesDescending,
    };
  });

  const formattedttedDates = sortHoursDescending.map((item) => {
    const parts = String(item.title);
    const year = parts.substring(2, 4);
    const month = parts.substring(4, 6);
    const day = parts.substring(6, 8);

    return {
      ...item,
      title: `${day}.${month}.${year}`,
    };
  });

  return formattedttedDates;
}
