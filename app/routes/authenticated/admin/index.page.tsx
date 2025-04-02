import { Link, redirect } from 'react-router';

export default function AdminIndex() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
      <p className="text-center mt-4">Welcome to the admin dashboard. Please select a season from the menu.</p>
      <div className="flex justify-center mt-8">
        <Link to="/admin/2025/constructors">Goto 2025</Link>
      </div>
    </div>
  );
}
