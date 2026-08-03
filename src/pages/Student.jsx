import AuthPortal from '../components/AuthPortal.jsx';

export default function Student() {
  return (
    <AuthPortal
      role="student"
      title="כניסת תלמידים"
      roleLabel="בואו נמשיך לתרגל ולהתקדם."
      dashboardLabel="כניסה לתרגול"
    />
  );
}
