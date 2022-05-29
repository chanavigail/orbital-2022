import React from 'react'
import { supabase } from './db'

export default function Profile() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = useAuth();
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await signUp({ email, password })
      if (error) throw error
      alert('error signing in')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false);
      history.push("/");
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Login/Register</h1>
        {loading ? (
          'loading...'
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="inputField"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button block">
              Login
            </button>
            <button className="button block">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  )
}