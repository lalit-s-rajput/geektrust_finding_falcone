export const mockData = {
  Planets: [
    { name: 'Donlon', distance: 100 },
    { name: 'Enchai', distance: 200 },
    { name: 'Jebing', distance: 300 },
    { name: 'Sapir', distance: 400 },
    { name: 'Lerbin', distance: 500 },
    { name: 'Pingasor', distance: 600 },
  ],
  vehicle: [
    { name: 'Space pod', total_no: 2, max_distance: 200, speed: 2 },
    { name: 'Space rocket', total_no: 1, max_distance: 300, speed: 4 },
    { name: 'Space shuttle', total_no: 1, max_distance: 400, speed: 5 },
    { name: 'Space ship', total_no: 2, max_distance: 600, speed: 10 },
  ],
  finalData: {
    token: 'test-token',
    planet_names: ['Donlon', 'Enchai', 'Jebing', 'Sapir'],
    vehicle_names: ['Space pod', 'Space pod', 'Space shuttle', 'Space ship'],
  },
  resetData: {
    token: '',
    planet_names: [],
    vehicle_names: [],
  },
  successResponse: {
    planet_name: 'Jebing',
    status: 'success',
  },
  failureResponse: {
    status: false,
  },
  errorResponse: {
    error: Error('test error'),
  },
};
