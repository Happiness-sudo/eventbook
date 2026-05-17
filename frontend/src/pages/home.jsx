import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={S.container}>

      {/* Blobs */}
      <div style={{...S.blob, width:350, height:350, background:"#4361EE", top:-80, right:-80}} />
      <div style={{...S.blob, width:250, height:250, background:"#FF3D9A", bottom:-60, left:-40}} />
      <div style={{...S.blob, width:200, height:200, background:"#06D6A0", top:"40%", left:"30%"}} />

      {/* Theme toggle */}
      <button onClick={toggleTheme} style={S.themeBtn}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <div style={S.card}>
        <div style={S.logo}>EventBook</div>
        <h1 style={S.title}>EventBook 🎉</h1>
        <p style={S.text}>
          Welcome to EventBook — your all-in-one platform to find vendors,
          book services, and manage events easily.
        </p>

        <div style={S.buttons}>
          <Link to="/login" style={S.login}>Login</Link>
          <Link to="/register" style={S.register}>Register</Link>
        </div>

        {/* Stats strip */}
        <div style={S.stats}>
          {[
            { n:"200+", l:"Vendors"  },
            { n:"1.2K", l:"Events"   },
            { n:"98%",  l:"Satisfied"},
          ].map((st) => (
            <div key={st.l} style={S.statItem}>
              <div style={S.statNum}>{st.n}</div>
              <div style={S.statLabel}>{st.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const S = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--bg)",              
    color: "var(--text)",                 
    position: "relative",
    overflow: "hidden",
    padding: "40px 20px",
  },
  blob: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: .15,
    pointerEvents: "none",
  },
  themeBtn: {
    position: "fixed",
    top: "20px",
    right: "20px",
    fontSize: "18px",
    background: "var(--card-bg)",        
    border: "1px solid var(--border)",
    borderRadius: "12px",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "440px",
    padding: "40px",
    borderRadius: "24px",
    background: "var(--card-bg)",       
    border: "1px solid var(--border)",
    textAlign: "center",
    boxShadow: "var(--shadow)",
  },
  logo: {
    fontFamily: "var(--font-head)",
    fontSize: "16px",
    fontWeight: 800,
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "12px",
  },
  title: {
    fontFamily: "var(--font-head)",
    fontSize: "32px",
    fontWeight: 800,
    color: "var(--text)",                
    marginBottom: "14px",
  },
  text: {
    fontSize: "13px",
    color: "var(--muted)",              
    marginBottom: "28px",
    lineHeight: 1.7,
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "28px",
  },
  login: {
    padding: "11px 28px",
    border: "1.5px solid var(--border2)", 
    borderRadius: "100px",
    color: "var(--text)",                
    textDecoration: "none",
    fontFamily: "var(--font-head)",
    fontSize: "13px",
    fontWeight: 700,
    background: "transparent",
  },
  register: {
    padding: "11px 28px",
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    borderRadius: "100px",
    color: "#fff",
    textDecoration: "none",
    fontFamily: "var(--font-head)",
    fontSize: "13px",
    fontWeight: 700,
    boxShadow: "0 4px 20px rgba(255,61,154,.3)",
  },
  stats: {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: "24px",
    borderTop: "1px solid var(--border)",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3px",
  },
  statNum: {
    fontFamily: "var(--font-head)",
    fontSize: "20px",
    fontWeight: 800,
    color: "var(--text)",               
  },
  statLabel: {
    fontSize: "10px",
    color: "var(--muted)",              
    letterSpacing: ".05em",
    textTransform: "uppercase",
  },
};