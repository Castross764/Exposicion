import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Plus, Trash2, LogOut, Mail, Key, Sparkles, Shield } from 'lucide-react';

const DEMO_USERS = [
  {
    email: 'maria.garcia@empresa.com',
    password: 'demo123',
    name: 'María García',
    picture: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=ec4899&color=fff&size=128',
    role: 'Product Manager'
  },
  {
    email: 'carlos.rodriguez@startup.io',
    password: 'demo456',
    name: 'Carlos Rodríguez',
    picture: 'https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=3b82f6&color=fff&size=128',
    role: 'Full Stack Developer'
  },
  {
    email: 'ana.martinez@tech.com',
    password: 'demo789',
    name: 'Ana Martínez',
    picture: 'https://ui-avatars.com/api/?name=Ana+Martinez&background=10b981&color=fff&size=128',
    role: 'UX Designer'
  }
];

export default function Auth0NotesDemo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = () => {
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const foundUser = DEMO_USERS.find(
        u => u.email === email && u.password === password
      );

      if (foundUser) {
        setLoginSuccess(true);
        setTimeout(() => {
          setIsAuthenticated(true);
          setUser(foundUser);
          setIsLoading(false);
          setLoginSuccess(false);
        }, 800);
      } else {
        setError('Credenciales inválidas. Intenta con uno de los usuarios de prueba.');
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setNotes([]);
    setNewNote('');
    setEmail('');
    setPassword('');
  };

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, {
        id: Date.now(),
        text: newNote,
        date: new Date().toLocaleDateString('es-ES'),
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const fillCredentials = (userIndex) => {
    setEmail(DEMO_USERS[userIndex].email);
    setPassword(DEMO_USERS[userIndex].password);
    setError('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className={`relative z-10 w-full max-w-6xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-6 p-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Shield className="w-4 h-4 text-purple-300" />
                <span className="text-sm font-medium">Protegido por Auth0</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Tus notas,
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  completamente seguras
                </span>
              </h1>
              
              <p className="text-lg text-gray-300">
                Autenticación empresarial con Auth0. Inicia sesión de forma segura y accede a tu espacio personal de notas.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm text-gray-400">OAuth 2.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="text-sm text-gray-400">JWT Tokens</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="text-sm text-gray-400">Encriptación</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl"></div>
              
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50 transform hover:scale-110 transition-transform duration-300">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
                  <p className="text-gray-600">Ingresa tus credenciales Auth0</p>
                </div>

                {loginSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-pulse">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">¡Autenticación exitosa!</span>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-600" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Key className="w-4 h-4 text-purple-600" />
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Autenticando...</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-5 h-5" />
                        <span>Iniciar Sesión</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-4 text-center font-medium">USUARIOS DE PRUEBA - CLICK PARA AUTOCOMPLETAR</p>
                  <div className="space-y-2">
                    {DEMO_USERS.map((usr, index) => (
                      <button
                        key={index}
                        onClick={() => fillCredentials(index)}
                        className="w-full p-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50 rounded-xl flex items-center gap-3 transition-all duration-200 border border-gray-200 hover:border-purple-300 group"
                      >
                        <img 
                          src={usr.picture} 
                          alt={usr.name}
                          className="w-10 h-10 rounded-full ring-2 ring-gray-300 group-hover:ring-purple-400 transition-all duration-200"
                        />
                        <div className="text-left flex-1">
                          <p className="font-semibold text-gray-800 text-sm">{usr.name}</p>
                          <p className="text-xs text-gray-500">{usr.email}</p>
                        </div>
                        <div className="text-xs text-gray-400 bg-white px-2 py-1 rounded-lg border border-gray-200">
                          {usr.role}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={user.picture} 
                alt={user.name}
                className="w-12 h-12 rounded-xl ring-2 ring-purple-400 shadow-lg transform hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                {user.name}
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{user.role}</span>
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-xl p-6 mb-8 border border-purple-100/50 transform hover:scale-[1.01] transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            Crear Nueva Nota
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addNote()}
              placeholder="¿Qué tienes en mente?"
              className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
            <button
              onClick={addNote}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Agregar
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              Mis Notas
              <span className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full shadow-lg">
                {notes.length}
              </span>
            </h3>
          </div>

          {notes.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-16 text-center border border-gray-100 transform hover:scale-[1.01] transition-all duration-300">
              <div className="text-6xl mb-4">📝</div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">No hay notas aún</h4>
              <p className="text-gray-500">¡Crea tu primera nota y comienza a organizar tus ideas!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {notes.map((note, index) => (
                <div 
                  key={note.id} 
                  className="bg-white rounded-2xl shadow-lg p-6 flex items-start justify-between hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:scale-[1.02] hover:-translate-y-1 group"
                >
                  <div className="flex-1">
                    <p className="text-gray-800 text-lg mb-2">{note.text}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{note.date}</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{note.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-3 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 border border-indigo-400/30 shadow-2xl">
          <div className="flex items-start gap-4 text-white">
            <div className="bg-white/20 p-3 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                ¿Cómo funciona la autenticación Auth0?
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-semibold mb-2">1️⃣ Login Seguro</div>
                  <p className="text-white/80">Auth0 maneja credenciales sin que tu app las vea</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-semibold mb-2">2️⃣ Token JWT</div>
                  <p className="text-white/80">Recibe token encriptado con info del usuario</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-semibold mb-2">3️⃣ Protección</div>
                  <p className="text-white/80">Solo usuarios autenticados acceden a recursos</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-semibold mb-2">4️⃣ Sesión Activa</div>
                  <p className="text-white/80">Mantiene sesión segura automáticamente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}