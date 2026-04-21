import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const properties = [
  { id: 1, title: 'Modern Villa', location: 'Chennai', price: '₹85,00,000', beds: 4, baths: 3, sqft: 2400, type: 'Sale', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400' },
  { id: 2, title: 'Cozy Apartment', location: 'Coimbatore', price: '₹25,000/mo', beds: 2, baths: 1, sqft: 900, type: 'Rent', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400' },
  { id: 3, title: 'Luxury Penthouse', location: 'Bangalore', price: '₹1,20,00,000', beds: 5, baths: 4, sqft: 3800, type: 'Sale', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400' },
  { id: 4, title: 'Studio Flat', location: 'Chennai', price: '₹12,000/mo', beds: 1, baths: 1, sqft: 450, type: 'Rent', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400' },
  { id: 5, title: 'Garden House', location: 'Madurai', price: '₹55,00,000', beds: 3, baths: 2, sqft: 1800, type: 'Sale', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400' },
  { id: 6, title: 'Beach Villa', location: 'Pondicherry', price: '₹95,00,000', beds: 4, baths: 3, sqft: 2800, type: 'Sale', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400' },
]

function Navbar() {
  return (
    <nav style={{background:'#1a1a2e',padding:'15px 30px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:100}}>
      <h2 style={{color:'#e94560',margin:0}}>🏠 KPTS Properties</h2>
      <div style={{display:'flex',gap:'20px'}}>
        <Link to="/" style={{color:'white',textDecoration:'none'}}>Home</Link>
        <Link to="/properties" style={{color:'white',textDecoration:'none'}}>Properties</Link>
        <Link to="/contact" style={{color:'white',textDecoration:'none'}}>Contact</Link>
      </div>
    </nav>
  )
}

function Home() {
  return (
    <div>
      <div style={{background:'linear-gradient(135deg,#1a1a2e,#16213e)',color:'white',padding:'80px 30px',textAlign:'center'}}>
        <h1 style={{fontSize:'48px',margin:'0 0 20px'}}>Find Your Dream Home</h1>
        <p style={{fontSize:'20px',color:'#aaa',marginBottom:'40px'}}>Discover the best properties across Tamil Nadu</p>
        <Link to="/properties" style={{background:'#e94560',color:'white',padding:'15px 40px',borderRadius:'8px',textDecoration:'none',fontSize:'18px'}}>Browse Properties</Link>
      </div>
      <div style={{padding:'60px 30px',textAlign:'center',background:'#f9f9f9'}}>
        <h2>Why Choose KPTS?</h2>
        <div style={{display:'flex',justifyContent:'center',gap:'40px',flexWrap:'wrap',marginTop:'30px'}}>
          {[['🏡','500+ Properties','Wide selection across cities'],['💰','Best Prices','Competitive market rates'],['🤝','Trusted Agents','Expert guidance always']].map(([icon,title,desc])=>(
            <div key={title} style={{background:'white',padding:'30px',borderRadius:'12px',boxShadow:'0 4px 15px rgba(0,0,0,0.1)',width:'200px'}}>
              <div style={{fontSize:'40px'}}>{icon}</div>
              <h3>{title}</h3>
              <p style={{color:'#666'}}>{desc}</p>
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
    <div style={{padding:'30px'}}>
      <h2 style={{textAlign:'center'}}>All Properties</h2>
      <div style={{textAlign:'center',marginBottom:'30px',display:'flex',gap:'10px',justifyContent:'center'}}>
        {['All','Sale','Rent'].map(f => (
          <button key={f} onClick={()=>setFilter(f)} style={{padding:'10px 25px',borderRadius:'20px',border:'none',background:filter===f?'#e94560':'#eee',color:filter===f?'white':'black',cursor:'pointer',fontSize:'16px'}}>{f}</button>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'25px',maxWidth:'1200px',margin:'0 auto'}}>
        {filtered.map(p => (
          <div key={p.id} style={{borderRadius:'12px',overflow:'hidden',boxShadow:'0 4px 15px rgba(0,0,0,0.1)',background:'white'}}>
            <img src={p.img} alt={p.title} style={{width:'100%',height:'200px',objectFit:'cover'}}/>
            <div style={{padding:'20px'}}>
              <span style={{background:p.type==='Sale'?'#e94560':'#0f3460',color:'white',padding:'4px 10px',borderRadius:'4px',fontSize:'12px'}}>{p.type}</span>
              <h3 style={{margin:'10px 0 5px'}}>{p.title}</h3>
              <p style={{color:'#666',margin:'0 0 10px'}}>📍 {p.location}</p>
              <p style={{color:'#e94560',fontWeight:'bold',fontSize:'20px',margin:'0 0 15px'}}>{p.price}</p>
              <div style={{display:'flex',gap:'15px',color:'#666',fontSize:'14px'}}>
                <span>🛏 {p.beds} Beds</span>
                <span>🚿 {p.baths} Baths</span>
                <span>📐 {p.sqft} sqft</span>
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
    <div style={{maxWidth:'600px',margin:'60px auto',padding:'0 20px'}}>
      <h2 style={{textAlign:'center'}}>Contact Us</h2>
      {sent ? <div style={{textAlign:'center',padding:'40px',background:'#e8f5e9',borderRadius:'12px'}}><h3>✅ Message Sent!</h3><p>We'll get back to you soon.</p></div> :
      <div style={{background:'white',padding:'40px',borderRadius:'12px',boxShadow:'0 4px 15px rgba(0,0,0,0.1)'}}>
        {['name','email','message'].map(field => (
          field === 'message'
            ? <textarea key={field} name={field} placeholder={field.charAt(0).toUpperCase()+field.slice(1)} value={form[field]} onChange={handle} rows={5} style={{width:'100%',padding:'12px',marginBottom:'15px',borderRadius:'8px',border:'1px solid #ddd',fontSize:'16px',boxSizing:'border-box'}}/>
            : <input key={field} name={field} type={field==='email'?'email':'text'} placeholder={field.charAt(0).toUpperCase()+field.slice(1)} value={form[field]} onChange={handle} style={{width:'100%',padding:'12px',marginBottom:'15px',borderRadius:'8px',border:'1px solid #ddd',fontSize:'16px',boxSizing:'border-box'}}/>
        ))}
        <button onClick={submit} style={{width:'100%',padding:'15px',background:'#e94560',color:'white',border:'none',borderRadius:'8px',fontSize:'18px',cursor:'pointer'}}>Send Message</button>
      </div>}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/properties" element={<Properties/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </Router>
  )
}