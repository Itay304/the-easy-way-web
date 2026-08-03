import { Navigate } from 'react-router-dom';
import useIsNarrow from '../hooks/useIsNarrow.js';

export default function RequireDesktop({ children }) {
  const isNarrow = useIsNarrow();

  if (isNarrow) {
    return <Navigate to="/" replace />;
  }

  return children;
}
