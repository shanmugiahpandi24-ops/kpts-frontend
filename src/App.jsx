import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = 'https://kpts-backend.onrender.com/api'

const properties = [
  { id: 1, title: 'Modern Villa', location: 'Chennai', price: '₹85,00,000', beds: 4, baths: 3, sqft: 2400, type: 'Sale', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600' },
  { id: 2, title: 'Cozy Apartment', location: 'Coimbatore', price: '₹25,000/mo', beds: 2, baths: 1, sqft: 900, type: 'Rent', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600' },
  { id: 3, title: 'Luxury Penthouse', location: 'Bangalore', price: '₹1,20,00,000', beds: 5, baths: 4, sqft: 3800, type: 'Sale', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600' },
  { id: 4, title: 'Studio Flat', location: 'Chennai', price: '₹12,000/mo', beds: 1, baths: 1, sqft: 450, type: 'Rent', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600' },
  { id: 5, title: 'Garden House', location: 'Madurai', price: '₹55,00,000', beds: 3, baths: 2, sqft: 1800, type: 'Sale', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600' },
  { id: 6, title: 'Beach Villa', location: 'Pondicherry', price: '₹95,00,000', beds: 4, baths: 3, sqft: 2800, type: 'Sale', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600' },
]

const gold = '#C9A84C'
const dark = '#0a0a0a'
const darkCard = '#111111'
const darkNav = '#080808'

const luxInput = {width:'100%',padding:'14px 16px',marginBottom:'16px',borderRadius:'6px',border:`1px solid ${gold}44`,background:'#1a1a1a',color:'white',fontSize:'15px',boxSizing:'border-box',outline:'none'}
const luxBtn = {width:'100%',padding:'16px',background:`linear-gradient(135deg, ${gold}, #a07830)`,color:'#000',border:'none',borderRadius:'6px',fontSize:'16px',fontWeight:'bold',cursor:'pointer',letterSpacing:'2px'}

function Navbar({ user, setUser }) {
  const navigate = useNavigate()
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); navigate('/login') }
  return (
    <nav style={{background:darkNav,padding:'18px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:`1px solid ${gold}44`,position:'sticky',top:0,zIndex:100}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <span style={{fontSize:'24px'}}>👑</span>
        <span style={{color:gold,fontSize:'22px',fontWeight:'bold',letterSpacing:'3px'}}>KPTS LUXURY</span>
      </div>
      <div style={{display:'flex',gap:'30px',alignItems:'center'}}>
        {user ? (
          <>
            {['/', '/properties', '/contact'].map((path, i) => (
              <Link key={path} to={path} style={{color:'#ccc',textDecoration:'none',letterSpacing:'1px',fontSize:'13px'}}>
                {['HOME','PROPERTIES','CONTACT'][i]}
              </Link>
            ))}
            <span style={{color:gold,fontSize:'13px'}}>✦ {user.name}</span>
            <button onClick={logout} style={{background:'transparent',color:gold,border:`1px solid ${gold}`,padding:'8px 20px',borderRadius:'4px',cursor:'pointer',letterSpacing:'1px',fontSize:'12px'}}>LOGOUT</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{color:'#ccc',textDecoration:'none',letterSpacing:'1px',fontSize:'13px'}}>LOGIN</Link>
            <Link to="/signup" style={{background:gold,color:'#000',textDecoration:'none',padding:'10px 24px',borderRadius:'4px',letterSpacing:'1px',fontSize:'13px',fontWeight:'bold'}}>REGISTER</Link>
          </>
        )}
      </div>
    </nav>
  )
}

function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async () => {
    setLoading(true); setError('')
    try {
      const res = await axios.post(`${API}/auth/login`, form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user); navigate('/')
    } catch (err) { setError(err.response?.data?.message || 'Login failed') }
    setLoading(false)
  }
  return (
    <div style={{minHeight:'100vh',background:dark,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:darkCard,padding:'50px 40px',borderRadius:'8px',border:`1px solid ${gold}33`,width:'100%',maxWidth:'420px',boxShadow:`0 20px 60px rgba(0,0,0,0.8)`}}>
        <div style={{textAlign:'center',marginBottom:'35px'}}>
          <div style={{fontSize:'40px',marginBottom:'10px'}}>👑</div>
          <h2 style={{color:gold,letterSpacing:'4px',margin:0,fontSize:'22px'}}>WELCOME BACK</h2>
          <p style={{color:'#666',marginTop:'8px',fontSize:'13px',letterSpacing:'1px'}}>Sign in to your luxury account</p>
        </div>
        {error && <div style={{background:'#2a0a0a',color:'#ff6b6b',padding:'12px',borderRadius:'6px',marginBottom:'15px',fontSize:'14px',border:'1px solid #ff000033'}}>{error}</div>}
        <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handle} style={luxInput}/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handle} style={luxInput}/>
        <button onClick={submit} disabled={loading} style={luxBtn}>{loading ? 'SIGNING IN...' : 'SIGN IN'}</button>
        <p style={{textAlign:'center',marginTop:'25px',color:'#666',fontSize:'13px'}}>
          New member? <Link to="/signup" style={{color:gold,textDecoration:'none'}}>Create Account</Link>
        </p>
      </div>
    </div>
  )
}

function Signup({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async () => {
    setLoading(true); setError('')
    try {
      const res = await axios.post(`${API}/auth/register`, form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user); navigate('/')
    } catch (err) { setError(err.response?.data?.message || 'Signup failed') }
    setLoading(false)
  }
  return (
    <div style={{minHeight:'100vh',background:dark,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:darkCard,padding:'50px 40px',borderRadius:'8px',border:`1px solid ${gold}33`,width:'100%',maxWidth:'420px',boxShadow:`0 20px 60px rgba(0,0,0,0.8)`}}>
        <div style={{textAlign:'center',marginBottom:'35px'}}>
          <div style={{fontSize:'40px',marginBottom:'10px'}}>🏛️</div>
          <h2 style={{color:gold,letterSpacing:'4px',margin:0,fontSize:'22px'}}>CREATE ACCOUNT</h2>
          <p style={{color:'#666',marginTop:'8px',fontSize:'13px',letterSpacing:'1px'}}>Join the exclusive community</p>
        </div>
        {error && <div style={{background:'#2a0a0a',color:'#ff6b6b',padding:'12px',borderRadius:'6px',marginBottom:'15px',fontSize:'14px',border:'1px solid #ff000033'}}>{error}</div>}
        <input name="name" placeholder="Full Name" value={form.name} onChange={handle} style={luxInput}/>
        <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handle} style={luxInput}/>
        <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={handle} style={luxInput}/>
        <button onClick={submit} disabled={loading} style={luxBtn}>{loading ? 'CREATING...' : 'CREATE ACCOUNT'}</button>
        <p style={{textAlign:'center',marginTop:'25px',color:'#666',fontSize:'13px'}}>
          Already a member? <Link to="/login" style={{color:gold,textDecoration:'none'}}>Sign In</Link>
        </p>
      </div>
    </div>
  )
}

function Home() {
  return (
    <div style={{background:dark,minHeight:'100vh',color:'white'}}>
      <div style={{background:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600') center/cover`,padding:'140px 30px',textAlign:'center'}}>
        <p style={{color:gold,letterSpacing:'6px',fontSize:'13px',marginBottom:'20px'}}>EXCLUSIVE PROPERTIES</p>
        <h1 style={{fontSize:'58px',margin:'0 0 20px',fontWeight:'300',letterSpacing:'2px',lineHeight:'1.2'}}>Find Your <span style={{color:gold}}>Dream</span> Home</h1>
        <p style={{fontSize:'18px',color:'#aaa',marginBottom:'50px',maxWidth:'500px',margin:'0 auto 50px'}}>Discover the finest properties across Tamil Nadu</p>
        <Link to="/properties" style={{background:`linear-gradient(135deg,${gold},#a07830)`,color:'#000',padding:'18px 50px',borderRadius:'4px',textDecoration:'none',fontSize:'14px',fontWeight:'bold',letterSpacing:'3px'}}>EXPLORE PROPERTIES</Link>
      </div>
      <div style={{padding:'80px 30px',textAlign:'center'}}>
        <p style={{color:gold,letterSpacing:'4px',fontSize:'12px',marginBottom:'10px'}}>WHY CHOOSE US</p>
        <h2 style={{fontSize:'36px',fontWeight:'300',marginBottom:'60px',color:'white'}}>The KPTS Difference</h2>
        <div style={{display:'flex',justifyContent:'center',gap:'30px',flexWrap:'wrap'}}>
          {[['👑','500+ Properties','Curated luxury listings'],['💎','Premium Quality','Only the finest homes'],['🤝','Expert Agents','White-glove service']].map(([icon,title,desc])=>(
            <div key={title} style={{background:darkCard,padding:'40px 30px',borderRadius:'8px',border:`1px solid ${gold}22`,width:'220px',transition:'border 0.3s'}}>
              <div style={{fontSize:'36px',marginBottom:'15px'}}>{icon}</div>
              <h3 style={{color:gold,letterSpacing:'2px',fontSize:'14px',marginBottom:'10px'}}>{title}</h3>
              <p style={{color:'#666',fontSize:'13px',lineHeight:'1.6'}}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Properties() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? properties : properties.filter(p => p.type === filter)
  return (
    <div style={{background:dark,minHeight:'100vh',padding:'50px 30px',color:'white'}}>
      <div style={{textAlign:'center',marginBottom:'50px'}}>
        <p style={{color:gold,letterSpacing:'4px',fontSize:'12px',marginBottom:'10px'}}>OUR COLLECTION</p>
        <h2 style={{fontSize:'36px',fontWeight:'300'}}>Exclusive Properties</h2>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',marginTop:'30px'}}>
          {['All','Sale','Rent'].map(f => (
            <button key={f} onClick={()=>setFilter(f)} style={{padding:'10px 30px',borderRadius:'4px',border:`1px solid ${filter===f?gold:'#333'}`,background:filter===f?gold:'transparent',color:filter===f?'#000':'#aaa',cursor:'pointer',letterSpacing:'2px',fontSize:'12px'}}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:'30px',maxWidth:'1200px',margin:'0 auto'}}>
        {filtered.map(p => (
          <div key={p.id} style={{borderRadius:'8px',overflow:'hidden',border:`1px solid ${gold}22`,background:darkCard,transition:'transform 0.3s'}}>
            <div style={{position:'relative'}}>
              <img src={p.img} alt={p.title} style={{width:'100%',height:'220px',objectFit:'cover'}}/>
              <span style={{position:'absolute',top:'15px',right:'15px',background:p.type==='Sale'?gold:'#1a1a2e',color:p.type==='Sale'?'#000':'white',padding:'5px 14px',borderRadius:'3px',fontSize:'11px',letterSpacing:'2px',fontWeight:'bold'}}>{p.type}</span>
            </div>
            <div style={{padding:'25px'}}>
              <h3 style={{color:'white',margin:'0 0 8px',fontSize:'18px',fontWeight:'400'}}>{p.title}</h3>
              <p style={{color:'#666',margin:'0 0 15px',fontSize:'13px'}}>📍 {p.location}</p>
              <p style={{color:gold,fontWeight:'bold',fontSize:'22px',margin:'0 0 20px',letterSpacing:'1px'}}>{p.price}</p>
              <div style={{display:'flex',gap:'20px',color:'#555',fontSize:'12px',borderTop:`1px solid #222`,paddingTop:'15px',letterSpacing:'1px'}}>
                <span>🛏 {p.beds} BEDS</span>
                <span>🚿 {p.baths} BATHS</span>
                <span>📐 {p.sqft} SQFT</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Contact() {
  const [form, setForm] = useState({name:'',email:'',message:''})
  const [sent, setSent] = useState(false)
  const handle = e => setForm({...form,[e.target.name]:e.target.value})
  const submit = () => { if(form.name&&form.email&&form.message){ setSent(true) } }
  return (
    <div style={{background:dark,minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'60px 20px'}}>
      <div style={{width:'100%',maxWidth:'550px'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <p style={{color:gold,letterSpacing:'4px',fontSize:'12px',marginBottom:'10px'}}>GET IN TOUCH</p>
          <h2 style={{color:'white',fontSize:'36px',fontWeight:'300'}}>Contact Us</h2>
        </div>
        {sent ?
          <div style={{textAlign:'center',padding:'50px',background:darkCard,borderRadius:'8px',border:`1px solid ${gold}33`}}>
            <div style={{fontSize:'50px',marginBottom:'20px'}}>✉️</div>
            <h3 style={{color:gold,letterSpacing:'3px'}}>MESSAGE SENT</h3>
            <p style={{color:'#666'}}>Our team will contact you shortly.</p>
          </div> :
          <div style={{background:darkCard,padding:'50px',borderRadius:'8px',border:`1px solid ${gold}33`}}>
            {['name','email','message'].map(field => (
              field === 'message'
                ? <textarea key={field} name={field} placeholder={field.charAt(0).toUpperCase()+field.slice(1)} value={form[field]} onChange={handle} rows={5} style={{...luxInput,resize:'none'}}/>
                : <input key={field} name={field} type={field==='email'?'email':'text'} placeholder={field.charAt(0).toUpperCase()+field.slice(1)} value={form[field]} onChange={handle} style={luxInput}/>
            ))}
            <button onClick={submit} style={luxBtn}>SEND MESSAGE</button>
          </div>
        }
      </div>
    </div>
  )
}

function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  })
  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/" element={<PrivateRoute user={user}><Home /></PrivateRoute>} />
        <Route path="/properties" element={<PrivateRoute user={user}><Properties /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute user={user}><Contact /></PrivateRoute>} />
      </Routes>
    </Router>
  )
}