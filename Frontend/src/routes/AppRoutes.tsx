import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Sessions from '../pages/Sessions';
import CreateSession from '../pages/CreateSession';
import SessionDetail from '../pages/SessionDetail';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/create" element={<CreateSession />} />
            <Route path="/sessions/:id" element={<SessionDetail />} />
        </Routes>
    );
}
