import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const API = 'https://kpts-backend.onrender.com/api'

const properties = [
  { id: 1, title: 'Modern Villa', location: 'Chennai', price: '₹85,00,000', beds: 4, baths: 3, sqft: 2400, type: 'Sale',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=100',
    gallery: [
      { label: 'Living Room', url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1600&q=100' },
      { label: 'Master Bedroom', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=100' },
      { label: 'Kitchen', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=100' },
      { label: 'Bathroom', url: 'https://images.unsplash.com/photo-1620626011761-996317702519?w=1600&q=100' },
      { label: 'Garden', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=100' },
      { label: 'Pool', url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1600&q=100' },
    ],
    desc: 'A stunning modern villa with private pool, landscaped garden, and premium finishes throughout. Located in a prime gated community in Chennai with 24/7 security.',
    amenities: ['Swimming Pool', 'Garden', 'Parking', 'Security', 'Power Backup', 'Gym'] },

  { id: 2, title: 'Cozy Apartment', location: 'Coimbatore', price: '₹25,000/mo', beds: 2, baths: 1, sqft: 900, type: 'Rent',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=100',
    gallery: [
      { label: 'Living Room', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&q=100' },
      { label: 'Bedroom', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=100' },
      { label: 'Kitchen', url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600&q=100' },
      { label: 'Bathroom', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=100' },
      { label: 'Balcony', url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&q=100' },
    ],
    desc: 'A beautifully furnished apartment in the heart of Coimbatore. Perfect for young professionals with modern kitchen, spacious living area and balcony views.',
    amenities: ['Furnished', 'Balcony', 'Lift', 'Parking', 'Security', 'WiFi Ready'] },

  { id: 3, title: 'Luxury Penthouse', location: 'Bangalore', price: '₹1,20,00,000', beds: 5, baths: 4, sqft: 3800, type: 'Sale',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=100',
    gallery: [
      { label: 'Living Room', url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=100' },
      { label: 'Master Bedroom', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=100' },
      { label: 'Kitchen', url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600&q=100' },
      { label: 'Bathroom', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=100' },
      { label: 'Terrace', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=100' },
      { label: 'Home Theatre', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=100' },
    ],
    desc: 'An ultra-luxury penthouse on the top floor with panoramic city views. Features a private terrace, home theatre, and world-class finishes.',
    amenities: ['Terrace', 'Home Theatre', 'Private Pool', 'Concierge', 'Valet Parking', 'Gym'] },

  { id: 4, title: 'Studio Flat', location: 'Chennai', price: '₹12,000/mo', beds: 1, baths: 1, sqft: 450, type: 'Rent',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=100',
    gallery: [
      { label: 'Studio Area', url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1600&q=100' },
      { label: 'Kitchen', url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&q=100' },
      { label: 'Bathroom', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=100' },
      { label: 'Workspace', url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1600&q=100' },
    ],
    desc: 'A compact and well-designed studio flat ideal for students and working professionals. Fully equipped with all essential amenities.',
    amenities: ['Furnished', 'WiFi Ready', 'Security', 'Lift', 'Power Backup'] },

  { id: 5, title: 'Garden House', location: 'Madurai', price: '₹55,00,000', beds: 3, baths: 2, sqft: 1800, type: 'Sale',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=100',
    gallery: [
      { label: 'Living Room', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=100' },
      { label: 'Bedroom', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=100' },
      { label: 'Kitchen', url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1600&q=100' },
      { label: 'Garden', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=100' },
      { label: 'Dining Room', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=100' },
    ],
    desc: 'A charming independent house with a beautiful garden and peaceful surroundings. Perfect for families looking for a serene lifestyle.',
    amenities: ['Garden', 'Parking', 'Security', 'Power Backup', 'Vastu Compliant'] },

  { id: 6, title: 'Beach Villa', location: 'Pondicherry', price: '₹95,00,000', beds: 4, baths: 3, sqft: 2800, type: 'Sale',
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1600&q=100',
    gallery: [
      { label: 'Living Room', url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=100' },
      { label: 'Bedroom', url: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1600&q=100' },
      { label: 'Kitchen', url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600&q=100' },
      { label: 'Bathroom', url: 'https://images.unsplash.com/photo-1620626011761-996317702519?w=1600&q=100' },
      { label: 'Beach View', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=100' },
      { label: 'Pool', url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1600&q=100' },
    ],
    desc: 'An exclusive beachfront villa with direct sea access, private deck, and breathtaking ocean views. A rare opportunity in Pondicherry.',
    amenities: ['Beach Access', 'Private Deck', 'Pool', 'Parking', 'Security', 'Generator'] },

  { id: 7, title: 'Tenkasi Heritage Villa', location: 'Tenkasi', price: '₹45,00,000', beds: 3, baths: 2, sqft: 2000, type: 'Sale',
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=100',
    gallery: [
      { label: 'Living Room', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&q=100' },
      { label: 'Bedroom', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=100' },
      { label: 'Kitchen', url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&q=100' },
      { label: 'Garden', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=100' },
      { label: 'Mountain View', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=100' },
    ],
    desc: 'A beautiful heritage-style villa in the scenic city of Tenkasi, nestled near the Western Ghats. Perfect for those who love nature and tranquility.',
    amenities: ['Garden', 'Parking', 'Security', 'Power Backup', 'Vastu Compliant', 'Mountain View'] },
]

const gold = '#C9A84C'
const dark = '#0a0a0a'
const darkCard = '#111111'
const darkNav = '#080808'
const luxInput = {width:'100%',padding:'14px 16px',marginBottom:'16px',borderRadius:'6px',border:`1px solid ${gold}44`,background:'#1a1a1a',color:'white',fontSize:'15px',boxSizing:'border-box',outline:'none'}
const luxBtn = {width:'100%',padding:'16px',background:`linear-gradient(135deg, ${gold}, #a07830)`,color:'#000',border:'none',borderRadius:'6px',fontSize:'16px',fontWeight:'bold',cursor:'pointer',letterSpacing:'2px'}

function Footer() {
  return (
    <footer style={{background:'#050505',borderTop:`1px solid ${gold}22`,padding:'50px 30px 30px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'40px',marginBottom:'40px'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'15px'}}>
              <img src="/logo.png.jpeg" alt="KPTS Groups" style={{height:'40px',objectFit:'contain'}}/>
              <span style={{color:gold,fontSize:'18px',fontWeight:'bold',letterSpacing:'3px'}}>KPTS GROUPS</span>
            </div>
            <p style={{color:'#555',fontSize:'13px',lineHeight:'1.8',maxWidth:'280px'}}>Exclusive luxury villa specialists across Tamil Nadu. Your dream home, curated with care.</p>
          </div>
          <div>
            <p style={{color:gold,letterSpacing:'3px',fontSize:'11px',marginBottom:'15px'}}>QUICK LINKS</p>
            {['/', '/properties', '/about', '/agent', '/contact'].map((path, i) => (
              <div key={path} style={{marginBottom:'8px'}}>
                <Link to={path} style={{color:'#555',textDecoration:'none',fontSize:'13px',letterSpacing:'1px'}}>
                  {['Home', 'Properties', 'About Us', 'Our Agent', 'Contact'][i]}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <p style={{color:gold,letterSpacing:'3px',fontSize:'11px',marginBottom:'15px'}}>CITIES WE SERVE</p>
            {['Chennai', 'Coimbatore', 'Bangalore', 'Madurai', 'Pondicherry', 'Tenkasi'].map(city => (
              <div key={city} style={{marginBottom:'8px'}}>
                <span style={{color:'#555',fontSize:'13px'}}>📍 {city}</span>
              </div>
            ))}
          </div>
          <div>
            <p style={{color:gold,letterSpacing:'3px',fontSize:'11px',marginBottom:'15px'}}>CONTACT</p>
            <p style={{color:'#555',fontSize:'13px',marginBottom:'8px'}}>📧 shanmugiahpandi24@gmail.com</p>
            <p style={{color:'#555',fontSize:'13px',marginBottom:'8px'}}>🌐 100% Online Platform</p>
            <p style={{color:'#555',fontSize:'13px'}}>⏰ Available 24/7</p>
          </div>
        </div>
        <div style={{borderTop:`1px solid ${gold}11`,paddingTop:'25px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'15px'}}>
          <p style={{color:'#333',fontSize:'12px',letterSpacing:'1px',margin:0}}>© 2026 KPTS GROUPS. ALL RIGHTS RESERVED.</p>
          <div style={{textAlign:'right'}}>
            <p style={{color:'#444',fontSize:'11px',letterSpacing:'2px',margin:'0 0 4px'}}>CO-FOUNDER & CEO</p>
            <p style={{color:gold,fontSize:'14px',letterSpacing:'2px',margin:0,fontWeight:'bold'}}>P. Shanmugiah Pandi</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Navbar({ user, setUser }) {
  const navigate = useNavigate()
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); navigate('/login') }
  return (
    <nav style={{background:darkNav,padding:'18px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:`1px solid ${gold}44`,position:'sticky',top:0,zIndex:100}}>
      <Link to="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
        <img src="/logo.png.jpeg" alt="KPTS Groups" style={{height:'45px',objectFit:'contain'}}/>
        <span style={{color:gold,fontSize:'20px',fontWeight:'bold',letterSpacing:'3px'}}>KPTS GROUPS</span>
      </Link>
      <div style={{display:'flex',gap:'25px',alignItems:'center'}}>
        {user ? (
          <>
            {['/', '/properties', '/about', '/agent', '/contact'].map((path, i) => (
              <Link key={path} to={path} style={{color:'#ccc',textDecoration:'none',letterSpacing:'1px',fontSize:'12px'}}>
                {['HOME','PROPERTIES','ABOUT','AGENT','CONTACT'][i]}
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
      <div style={{background:darkCard,padding:'50px 40px',borderRadius:'8px',border:`1px solid ${gold}33`,width:'100%',maxWidth:'420px',boxShadow:'0 20px 60px rgba(0,0,0,0.8)'}}>
        <div style={{textAlign:'center',marginBottom:'35px'}}>
          <img src="/logo.png.jpeg" alt="KPTS" style={{height:'70px',objectFit:'contain',marginBottom:'15px'}}/>
          <h2 style={{color:gold,letterSpacing:'4px',margin:0,fontSize:'22px'}}>WELCOME BACK</h2>
          <p style={{color:'#666',marginTop:'8px',fontSize:'13px',letterSpacing:'1px'}}>Sign in to your luxury account</p>
        </div>
        {error && <div style={{background:'#2a0a0a',color:'#ff6b6b',padding:'12px',borderRadius:'6px',marginBottom:'15px',fontSize:'14px'}}>{error}</div>}
        <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handle} style={luxInput}/>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handle} style={luxInput}/>
        <button onClick={submit} disabled={loading} style={luxBtn}>{loading ? 'SIGNING IN...' : 'SIGN IN'}</button>
        <p style={{textAlign:'center',marginTop:'25px',color:'#666',fontSize:'13px'}}>New member? <Link to="/signup" style={{color:gold,textDecoration:'none'}}>Create Account</Link></p>
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
      <div style={{background:darkCard,padding:'50px 40px',borderRadius:'8px',border:`1px solid ${gold}33`,width:'100%',maxWidth:'420px',boxShadow:'0 20px 60px rgba(0,0,0,0.8)'}}>
        <div style={{textAlign:'center',marginBottom:'35px'}}>
          <img src="/logo.png.jpeg" alt="KPTS" style={{height:'70px',objectFit:'contain',marginBottom:'15px'}}/>
          <h2 style={{color:gold,letterSpacing:'4px',margin:0,fontSize:'22px'}}>CREATE ACCOUNT</h2>
          <p style={{color:'#666',marginTop:'8px',fontSize:'13px',letterSpacing:'1px'}}>Join the exclusive community</p>
        </div>
        {error && <div style={{background:'#2a0a0a',color:'#ff6b6b',padding:'12px',borderRadius:'6px',marginBottom:'15px',fontSize:'14px'}}>{error}</div>}
        <input name="name" placeholder="Full Name" value={form.name} onChange={handle} style={luxInput}/>
        <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handle} style={luxInput}/>
        <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={handle} style={luxInput}/>
        <button onClick={submit} disabled={loading} style={luxBtn}>{loading ? 'CREATING...' : 'CREATE ACCOUNT'}</button>
        <p style={{textAlign:'center',marginTop:'25px',color:'#666',fontSize:'13px'}}>Already a member? <Link to="/login" style={{color:gold,textDecoration:'none'}}>Sign In</Link></p>
      </div>
    </div>
  )
}

function Home() {
  return (
    <div style={{background:dark,color:'white'}}>
      <div style={{background:"linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=100') center/cover",padding:'160px 30px',textAlign:'center'}}>
        <p style={{color:gold,letterSpacing:'8px',fontSize:'12px',marginBottom:'20px'}}>KPTS GROUPS — LUXURY REAL ESTATE</p>
        <h1 style={{fontSize:'60px',margin:'0 0 20px',fontWeight:'300',letterSpacing:'2px',lineHeight:'1.2'}}>Find Your <span style={{color:gold}}>Dream</span> Villa</h1>
        <p style={{fontSize:'18px',color:'#aaa',marginBottom:'50px',maxWidth:'500px',margin:'0 auto 50px'}}>Exclusive luxury villas across Tamil Nadu — curated for the finest taste</p>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/properties" style={{background:`linear-gradient(135deg,${gold},#a07830)`,color:'#000',padding:'18px 50px',borderRadius:'4px',textDecoration:'none',fontSize:'14px',fontWeight:'bold',letterSpacing:'3px'}}>EXPLORE VILLAS</Link>
          <Link to="/about" style={{background:'transparent',color:gold,padding:'18px 50px',borderRadius:'4px',textDecoration:'none',fontSize:'14px',fontWeight:'bold',letterSpacing:'3px',border:`1px solid ${gold}`}}>ABOUT US</Link>
        </div>
      </div>
      <div style={{padding:'80px 30px',textAlign:'center'}}>
        <p style={{color:gold,letterSpacing:'4px',fontSize:'12px',marginBottom:'10px'}}>WHY CHOOSE US</p>
        <h2 style={{fontSize:'36px',fontWeight:'300',marginBottom:'60px'}}>The KPTS Groups Difference</h2>
        <div style={{display:'flex',justifyContent:'center',gap:'30px',flexWrap:'wrap'}}>
          {[['👑','Luxury Villas Only','We specialize exclusively in luxury villa properties'],['💎','100% Online','Browse, enquire and connect — all from your device'],['🤝','Trusted Service','Personalized service for every client'],['🌍','Pan Tamil Nadu','Properties across all major Tamil Nadu cities']].map(([icon,title,desc])=>(
            <div key={title}
              style={{background:darkCard,padding:'40px 30px',borderRadius:'8px',border:`1px solid ${gold}44`,width:'220px',cursor:'pointer',transition:'all 0.3s ease'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-10px)';e.currentTarget.style.boxShadow=`0 20px 40px rgba(201,168,76,0.2)`;e.currentTarget.style.border=`1px solid ${gold}`}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0px)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.border=`1px solid ${gold}44`}}>
              <div style={{fontSize:'36px',marginBottom:'15px'}}>{icon}</div>
              <h3 style={{color:gold,letterSpacing:'2px',fontSize:'13px',marginBottom:'10px'}}>{title}</h3>
              <p style={{color:'#666',fontSize:'13px',lineHeight:'1.6'}}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:'0 30px 80px',textAlign:'center'}}>
        <div style={{display:'flex',justifyContent:'center',gap:'60px',flexWrap:'wrap',borderTop:`1px solid ${gold}22`,paddingTop:'60px'}}>
          {[['500+','Properties Listed'],['1000+','Happy Clients'],['7','Cities Covered'],['100%','Online Service']].map(([num,label])=>(
            <div key={label}>
              <div style={{color:gold,fontSize:'48px',fontWeight:'bold'}}>{num}</div>
              <div style={{color:'#666',letterSpacing:'2px',fontSize:'12px',marginTop:'5px'}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

function About() {
  return (
    <div style={{background:dark,color:'white'}}>
      <div style={{background:`linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.95)), url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=100') center/cover`,padding:'100px 30px',textAlign:'center'}}>
        <p style={{color:gold,letterSpacing:'6px',fontSize:'12px',marginBottom:'15px'}}>WHO WE ARE</p>
        <h1 style={{fontSize:'50px',fontWeight:'300',margin:'0 0 20px'}}>About <span style={{color:gold}}>KPTS Groups</span></h1>
        <p style={{color:'#aaa',fontSize:'17px',maxWidth:'600px',margin:'0 auto'}}>Your trusted partner in finding exclusive luxury villas across Tamil Nadu</p>
      </div>
      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'80px 30px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',marginBottom:'80px',alignItems:'center'}}>
          <div>
            <p style={{color:gold,letterSpacing:'4px',fontSize:'12px',marginBottom:'15px'}}>OUR STORY</p>
            <h2 style={{fontSize:'34px',fontWeight:'300',marginBottom:'25px'}}>Born from a passion for luxury living</h2>
            <p style={{color:'#888',lineHeight:'1.9',fontSize:'15px',marginBottom:'20px'}}>KPTS Groups was founded with a single vision — to make luxury villa living accessible to those who deserve the finest. We are a fully online real estate platform specializing exclusively in premium and luxury villas across Tamil Nadu.</p>
            <p style={{color:'#888',lineHeight:'1.9',fontSize:'15px'}}>As a fresh and dynamic company, we bring energy, dedication, and a modern approach to real estate. Every property on our platform is carefully curated to meet the highest standards of luxury and comfort.</p>
          </div>
          <div style={{background:darkCard,borderRadius:'8px',padding:'40px',border:`1px solid ${gold}22`}}>
            {[['500+','LUXURY VILLAS LISTED'],['7','CITIES COVERED'],['100%','ONLINE PLATFORM'],['24/7','CUSTOMER SUPPORT']].map(([num,label],i)=>(
              <div key={label} style={{marginBottom:i<3?'30px':0,paddingBottom:i<3?'30px':0,borderBottom:i<3?`1px solid #222`:'none'}}>
                <div style={{color:gold,fontSize:'42px',fontWeight:'bold'}}>{num}</div>
                <div style={{color:'#666',letterSpacing:'2px',fontSize:'12px',marginTop:'5px'}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{textAlign:'center',background:darkCard,padding:'50px',borderRadius:'8px',border:`1px solid ${gold}33`}}>
          <p style={{color:gold,letterSpacing:'4px',fontSize:'12px',marginBottom:'15px'}}>GET STARTED</p>
          <h2 style={{fontSize:'32px',fontWeight:'300',marginBottom:'20px'}}>Ready to find your dream villa?</h2>
          <p style={{color:'#666',marginBottom:'35px',fontSize:'15px'}}>Browse our exclusive collection of luxury villas across Tamil Nadu</p>
          <Link to="/properties" style={{background:`linear-gradient(135deg,${gold},#a07830)`,color:'#000',padding:'16px 45px',borderRadius:'4px',textDecoration:'none',fontSize:'14px',fontWeight:'bold',letterSpacing:'3px'}}>VIEW ALL VILLAS</Link>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

function Agent() {
  return (
    <div style={{background:dark,color:'white'}}>
      <div style={{background:`linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.95)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=100') center/cover`,padding:'100px 30px',textAlign:'center'}}>
        <p style={{color:gold,letterSpacing:'6px',fontSize:'12px',marginBottom:'15px'}}>MEET THE TEAM</p>
        <h1 style={{fontSize:'50px',fontWeight:'300',margin:'0 0 20px'}}>Our <span style={{color:gold}}>Agent</span></h1>
      </div>
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'80px 30px'}}>
        <div style={{background:darkCard,borderRadius:'12px',border:`1px solid ${gold}33`,overflow:'hidden',marginBottom:'50px'}}>
          <div style={{display:'grid',gridTemplateColumns:'300px 1fr'}}>
            <div style={{background:`linear-gradient(135deg, #1a1a1a, #0d0d0d)`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'50px 30px',borderRight:`1px solid ${gold}22`}}>
              <div style={{width:'150px',height:'150px',borderRadius:'50%',background:`linear-gradient(135deg,${gold},#a07830)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'60px',marginBottom:'20px'}}>👨‍💼</div>
              <h2 style={{color:gold,letterSpacing:'3px',fontSize:'16px',margin:'0 0 4px',textAlign:'center'}}>P. SHANMUGIAH PANDI</h2>
              <p style={{color:'#666',fontSize:'11px',letterSpacing:'2px',marginBottom:'5px'}}>CO-FOUNDER & CEO</p>
              <p style={{color:'#555',fontSize:'11px',letterSpacing:'2px',marginBottom:'25px'}}>LEAD AGENT</p>
              <div style={{display:'flex',flexDirection:'column',gap:'10px',width:'100%'}}>
                <a href="mailto:shanmugiahpandi24@gmail.com" style={{display:'flex',alignItems:'center',gap:'8px',color:'#aaa',fontSize:'12px',textDecoration:'none',background:'#1a1a1a',padding:'10px 15px',borderRadius:'6px',border:`1px solid ${gold}22`}}>
                  <span>📧</span> Email Me
                </a>
                <Link to="/contact" style={{display:'flex',alignItems:'center',gap:'8px',color:'#000',fontSize:'12px',textDecoration:'none',background:`linear-gradient(135deg,${gold},#a07830)`,padding:'10px 15px',borderRadius:'6px',fontWeight:'bold',justifyContent:'center'}}>
                  <span>💬</span> Contact Now
                </Link>
              </div>
            </div>
            <div style={{padding:'50px 40px'}}>
              <p style={{color:gold,letterSpacing:'3px',fontSize:'11px',marginBottom:'20px'}}>ABOUT THE AGENT</p>
              <p style={{color:'#aaa',lineHeight:'1.9',fontSize:'15px',marginBottom:'25px'}}>Hi, I am P. Shanmugiah Pandi, Co-Founder and CEO of KPTS Groups. I started this platform with a burning passion for luxury real estate and a vision to revolutionize how people discover premium villas in Tamil Nadu.</p>
              <p style={{color:'#aaa',lineHeight:'1.9',fontSize:'15px',marginBottom:'35px'}}>I bring enthusiasm, dedication, and a modern digital-first approach. I personally curate every listing to ensure it meets the highest luxury standards. My goal — to help you find your perfect dream villa.</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'35px'}}>
                {[['🏠','Luxury Villas','Specialization'],['🌐','100% Online','Platform'],['⭐','5 Star','Client Rating'],['📱','Always Available','Support']].map(([icon,val,label])=>(
                  <div key={label} style={{background:'#0d0d0d',padding:'20px',borderRadius:'6px',border:`1px solid ${gold}22`}}>
                    <div style={{fontSize:'20px',marginBottom:'8px'}}>{icon}</div>
                    <div style={{color:gold,fontSize:'14px',fontWeight:'bold',marginBottom:'4px'}}>{val}</div>
                    <div style={{color:'#555',fontSize:'11px',letterSpacing:'1px'}}>{label}</div>
                  </div>
                ))}
              </div>
              <div>
                <p style={{color:gold,letterSpacing:'3px',fontSize:'11px',marginBottom:'15px'}}>CITIES COVERED</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                  {['Chennai','Coimbatore','Bangalore','Madurai','Pondicherry','Tenkasi'].map(city=>(
                    <span key={city} style={{background:'#1a1a1a',color:'#aaa',padding:'6px 14px',borderRadius:'4px',fontSize:'12px',border:`1px solid ${gold}22`}}>📍 {city}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

function Properties() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? properties : properties.filter(p => p.type === filter)
  return (
    <div style={{background:dark,minHeight:'100vh',color:'white'}}>
      <div style={{padding:'50px 30px'}}>
        <div style={{textAlign:'center',marginBottom:'50px'}}>
          <p style={{color:gold,letterSpacing:'4px',fontSize:'12px',marginBottom:'10px'}}>OUR COLLECTION</p>
          <h2 style={{fontSize:'36px',fontWeight:'300'}}>Exclusive Luxury Villas</h2>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',marginTop:'30px'}}>
            {['All','Sale','Rent'].map(f => (
              <button key={f} onClick={()=>setFilter(f)} style={{padding:'10px 30px',borderRadius:'4px',border:`1px solid ${filter===f?gold:'#333'}`,background:filter===f?gold:'transparent',color:filter===f?'#000':'#aaa',cursor:'pointer',letterSpacing:'2px',fontSize:'12px'}}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:'30px',maxWidth:'1200px',margin:'0 auto'}}>
          {filtered.map(p => (
            <Link key={p.id} to={`/property/${p.id}`} style={{textDecoration:'none'}}>
              <div
                style={{borderRadius:'8px',overflow:'hidden',border:`1px solid ${gold}22`,background:darkCard,cursor:'pointer',transition:'all 0.3s ease'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-8px)';e.currentTarget.style.boxShadow=`0 20px 40px rgba(201,168,76,0.15)`;e.currentTarget.style.border=`1px solid ${gold}88`}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0px)';e.currentTarget.style.boxShadow='none';e.currentTarget.style.border=`1px solid ${gold}22`}}>
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
            </Link>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

function PropertyDetail() {
  const { id } = useParams()
  const p = properties.find(p => p.id === parseInt(id))
  const navigate = useNavigate()
  const [activeImg, setActiveImg] = useState(0)
  const [enquiry, setEnquiry] = useState({name:'',phone:'',message:''})
  const [sent, setSent] = useState(false)
  if (!p) return <div style={{color:'white',textAlign:'center',padding:'100px'}}>Property not found</div>
  const allImgs = [{ label: 'Main', url: p.img }, ...p.gallery]
  return (
    <div style={{background:dark,color:'white'}}>
      <div style={{position:'relative',height:'500px'}}>
        <img src={allImgs[activeImg].url} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover',transition:'0.3s'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9))'}}/>
        <button onClick={()=>navigate(-1)} style={{position:'absolute',top:'30px',left:'30px',background:`${gold}22`,color:gold,border:`1px solid ${gold}`,padding:'10px 20px',borderRadius:'4px',cursor:'pointer',letterSpacing:'1px',fontSize:'12px'}}>← BACK</button>
        <div style={{position:'absolute',bottom:'40px',left:'40px'}}>
          <span style={{background:p.type==='Sale'?gold:'#1a1a2e',color:p.type==='Sale'?'#000':'white',padding:'5px 14px',borderRadius:'3px',fontSize:'11px',letterSpacing:'2px',fontWeight:'bold'}}>{p.type}</span>
          <h1 style={{fontSize:'42px',fontWeight:'300',margin:'15px 0 5px'}}>{p.title}</h1>
          <p style={{color:'#aaa',fontSize:'16px'}}>📍 {p.location}</p>
        </div>
        <div style={{position:'absolute',bottom:'40px',right:'40px'}}>
          <p style={{color:gold,fontSize:'32px',fontWeight:'bold',margin:0}}>{p.price}</p>
        </div>
      </div>
      <div style={{background:'#0d0d0d',padding:'20px 30px',borderBottom:`1px solid ${gold}22`}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <p style={{color:gold,letterSpacing:'3px',fontSize:'11px',marginBottom:'15px'}}>PHOTO GALLERY</p>
          <div style={{display:'flex',gap:'12px',overflowX:'auto',paddingBottom:'10px'}}>
            {allImgs.map((img, i) => (
              <div key={i} onClick={()=>setActiveImg(i)}
                style={{flexShrink:0,cursor:'pointer',borderRadius:'6px',overflow:'hidden',border:`2px solid ${activeImg===i?gold:'transparent'}`,transition:'all 0.2s'}}>
                <div style={{position:'relative'}}>
                  <img src={img.url} alt={img.label} style={{width:'120px',height:'80px',objectFit:'cover',display:'block'}}/>
                  <div style={{position:'absolute',bottom:0,left:0,right:0,background:'rgba(0,0,0,0.6)',padding:'4px 6px',fontSize:'10px',color:'#ccc',letterSpacing:'1px',textAlign:'center'}}>{img.label.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'50px 30px',display:'grid',gridTemplateColumns:'1fr 380px',gap:'40px'}}>
        <div>
          <div style={{display:'flex',gap:'30px',background:darkCard,padding:'25px',borderRadius:'8px',border:`1px solid ${gold}22`,marginBottom:'30px'}}>
            {[['🛏',p.beds,'Bedrooms'],['🚿',p.baths,'Bathrooms'],['📐',p.sqft,'Sq. Ft.']].map(([icon,val,label])=>(
              <div key={label} style={{textAlign:'center',flex:1}}>
                <div style={{fontSize:'28px'}}>{icon}</div>
                <div style={{color:gold,fontSize:'22px',fontWeight:'bold'}}>{val}</div>
                <div style={{color:'#666',fontSize:'12px',letterSpacing:'1px'}}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{background:darkCard,padding:'30px',borderRadius:'8px',border:`1px solid ${gold}22`,marginBottom:'30px'}}>
            <h3 style={{color:gold,letterSpacing:'2px',fontSize:'13px',marginBottom:'15px'}}>ABOUT THIS PROPERTY</h3>
            <p style={{color:'#aaa',lineHeight:'1.8',fontSize:'15px'}}>{p.desc}</p>
          </div>
          <div style={{background:darkCard,padding:'30px',borderRadius:'8px',border:`1px solid ${gold}22`}}>
            <h3 style={{color:gold,letterSpacing:'2px',fontSize:'13px',marginBottom:'20px'}}>AMENITIES</h3>
            <div style={{display:'flex',flexWrap:'wrap',gap:'10px'}}>
              {p.amenities.map(a => (
                <span key={a} style={{background:'#1a1a1a',color:'#ccc',padding:'8px 16px',borderRadius:'4px',fontSize:'13px',border:`1px solid ${gold}22`}}>✓ {a}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{background:darkCard,padding:'30px',borderRadius:'8px',border:`1px solid ${gold}33`,height:'fit-content'}}>
          <h3 style={{color:gold,letterSpacing:'2px',fontSize:'13px',marginBottom:'25px',textAlign:'center'}}>ENQUIRE NOW</h3>
          {sent ? (
            <div style={{textAlign:'center',padding:'30px'}}>
              <div style={{fontSize:'40px',marginBottom:'15px'}}>✅</div>
              <p style={{color:gold,letterSpacing:'2px',fontSize:'13px'}}>ENQUIRY SENT!</p>
              <p style={{color:'#666',fontSize:'13px'}}>We will contact you shortly.</p>
            </div>
          ) : (
            <>
              <input placeholder="Your Name" value={enquiry.name} onChange={e=>setEnquiry({...enquiry,name:e.target.value})} style={luxInput}/>
              <input placeholder="Phone Number" value={enquiry.phone} onChange={e=>setEnquiry({...enquiry,phone:e.target.value})} style={luxInput}/>
              <textarea placeholder="Message" value={enquiry.message} onChange={e=>setEnquiry({...enquiry,message:e.target.value})} rows={4} style={{...luxInput,resize:'none'}}/>
              <button onClick={()=>{if(enquiry.name&&enquiry.phone)setSent(true)}} style={luxBtn}>SEND ENQUIRY</button>
            </>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

function Contact() {
  const [form, setForm] = useState({name:'',email:'',message:''})
  const [sent, setSent] = useState(false)
  const handle = e => setForm({...form,[e.target.name]:e.target.value})
  const submit = () => { if(form.name&&form.email&&form.message){ setSent(true) } }
  return (
    <div style={{background:dark,color:'white'}}>
      <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'60px 20px'}}>
        <div style={{width:'100%',maxWidth:'550px'}}>
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <p style={{color:gold,letterSpacing:'4px',fontSize:'12px',marginBottom:'10px'}}>GET IN TOUCH</p>
            <h2 style={{fontSize:'36px',fontWeight:'300'}}>Contact Us</h2>
            <p style={{color:'#666',fontSize:'14px',marginTop:'10px'}}>We respond within 24 hours</p>
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
      <Footer/>
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
        <Route path="/property/:id" element={<PrivateRoute user={user}><PropertyDetail /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute user={user}><About /></PrivateRoute>} />
        <Route path="/agent" element={<PrivateRoute user={user}><Agent /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute user={user}><Contact /></PrivateRoute>} />
      </Routes>
    </Router>
  )
}