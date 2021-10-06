import { useLocation } from 'react-router-dom';

export const useQuery = (): URLSearchParams =>
  new URLSearchParams(useLocation().search);
