import bcrypt from 'bcryptjs';

// Demo users — passwords pre-hashed
const password = await bcrypt.hash('password123', 10);

export const users = [
  {
    id: 'USR-001',
    name: 'Officer Aditya',
    email: 'aditya@vishtrace.io',
    password,
    role: 'officer',
    badge: 'OFC-4521',
    department: 'Forensics Unit Alpha',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'USR-002',
    name: 'Dr. Priya Sharma',
    email: 'priya@vishtrace.io',
    password,
    role: 'analyst',
    badge: 'ANL-1102',
    department: 'DNA Analysis Lab',
    createdAt: new Date().toISOString(),
  },
];

export const findUserByEmail = (email) => users.find((u) => u.email === email);
export const findUserById = (id) => users.find((u) => u.id === id);

export const createUser = async (name, email, rawPassword, role = 'officer') => {
  const hashed = await bcrypt.hash(rawPassword, 10);
  const user = {
    id: `USR-${Date.now()}`,
    name,
    email,
    password: hashed,
    role,
    badge: `OFC-${Math.floor(1000 + Math.random() * 9000)}`,
    department: 'Field Operations',
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
};
