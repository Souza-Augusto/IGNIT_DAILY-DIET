import { SeparateByDate } from './separate-by-date';

const DATA = [
  {
    id: '1',
    hour: '10:10',
    date: '12/12/2024',
    name: 'Banana',
    healthy: true,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },

  {
    id: '7',
    hour: '10:10',
    date: '12/12/2024',
    name: 'Banana',
    healthy: false,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },
  {
    id: '3',
    hour: '10:10',
    date: '12/05/2024',
    name: 'Banana',
    healthy: false,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },
  {
    id: '6',
    hour: '10:10',
    date: '12/05/2024',
    name: 'Banana',
    healthy: false,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },
  {
    id: '2',
    hour: '10:10',
    date: '12/01/2024',
    name: 'Banana',
    healthy: true,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },
];

const EXPECTED_DATA = [
  {
    title: '12.12.24',
    data: [
      {
        id: '1',
        hour: '10:10',
        date: '12/12/2024',
        name: 'Banana',
        healthy: true,
        description: 'teste',
        createdAt: '20/09/2023',
        updatedAt: '',
      },

      {
        id: '7',
        hour: '10:10',
        date: '12/12/2024',
        name: 'Banana',
        healthy: false,
        description: 'teste',
        createdAt: '20/09/2023',
        updatedAt: '',
      },
    ],
  },
  {
    title: '12.05.24',
    data: [
      {
        id: '3',
        hour: '10:10',
        date: '12/05/2024',
        name: 'Banana',
        healthy: false,
        description: 'teste',
        createdAt: '20/09/2023',
        updatedAt: '',
      },
      {
        id: '6',
        hour: '10:10',
        date: '12/05/2024',
        name: 'Banana',
        healthy: false,
        description: 'teste',
        createdAt: '20/09/2023',
        updatedAt: '',
      },
    ],
  },
  {
    title: '12.01.24',
    data: [
      {
        id: '2',
        hour: '10:10',
        date: '12/01/2024',
        name: 'Banana',
        healthy: true,
        description: 'teste',
        createdAt: '20/09/2023',
        updatedAt: '',
      },
    ],
  },
];

beforeAll(() => {
  jest.clearAllMocks();
});

describe('Function:OrganizeDates', () => {
  it('should data organized in descending order', () => {
    const RESULT = SeparateByDate(DATA);

    expect(RESULT).toEqual(EXPECTED_DATA);
  });
});
