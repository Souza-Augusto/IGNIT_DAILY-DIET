export type mealDTO = {
  id: string;
  hour: string;
  date: string;
  name: string;
  healthy: boolean;
  description: string;
  createdAt: string;
  updatedAt?: string;
};

export type listMealDTO = {
  title: string;
  data: mealDTO[];
};
